import { JwtPayload } from 'jsonwebtoken';
import AppError from '../../error/AppError';
import { orderUtils } from './order.utils';
import { IOrder } from './orders.interface';
import { Order } from './orders.model';
import { User } from '../auth/auth.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { OrderSearchableField } from './order.constant';
import { Medicine } from '../medicines/medicine.schema';

//Place order

const addOrderService = async (
  userId: string,
  payload: {
    medicines: { medicine: string; quantity: number }[];
    shippingInfo: {
      address: string;
      city: string;
      phone: string;
      customer: string;
    };
    shippingFee: number;
    prescriptionImage: string;
  },
  client_ip: string,
): Promise<string> => {
  if (!payload?.medicines?.length)
    throw new AppError(406, 'Order is not specified');
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(404, 'User not found');
  }
  const { address, city, phone, customer } = payload.shippingInfo;

  //user update
  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    {
      address,
      city,
      phone,
    },
    { new: true },
  );

  const medicines = payload.medicines;
  let totalPrice = 0;
  const medicineDetails = await Promise.all(
    medicines.map(async (item) => {
      const medicine = await Medicine.findById(item.medicine);

      if (medicine) {
        if (item?.quantity > medicine?.quantity) {
          throw new Error(
            `Insufficient stock for product "${medicine.name}". Only ${medicine.quantity} items left.`,
          );
        }
        const updateQuantity = medicine?.quantity - item?.quantity;
        await Medicine.findByIdAndUpdate(medicine?._id, {
          quantity: updateQuantity,
        });
        const subtotal = medicine ? (medicine.price || 0) * item.quantity : 0;
        totalPrice = totalPrice + subtotal + payload.shippingFee;
        return item;
      }
    }),
  );

  //create order
  let order = await Order.create({
    user: user._id,
    medicines: medicineDetails,
    totalPrice,
    prescriptionImage: payload?.prescriptionImage,
    customer: payload?.shippingInfo?.customer,
  });

  // payment integration
  const shurjopayPayload = {
    amount: totalPrice.toFixed(2),
    order_id: order._id,
    currency: 'BDT',
    customer_name: customer || updatedUser?.name,
    customer_address: address || updatedUser?.address,
    customer_email: updatedUser?.email,
    customer_phone: phone || updatedUser?.phone,
    customer_city: city || updatedUser?.city,
    client_ip,
  };
  const payment = await orderUtils.makePaymentAsync(shurjopayPayload);

  if (payment?.transactionStatus) {
    order = await order.updateOne({
      transaction: {
        id: payment.sp_order_id,
        transactionStatus: payment.transactionStatus,
      },
    });
  }

  return payment.checkout_url;
};

//Calculate Order revenue
const calculateRevenueService = async () => {
  const result = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$totalPrice' },
      },
    },
    {
      $project: {
        _id: 0, // Exclude _id
      },
    },
  ]);
  return result;
};

//Get All Product
const getAllOrderService = async () => {
  /*
  const allOrderQuery = new QueryBuilder(
    Order.find().populate('user').populate('products.product'),
    searchTerm,
  )
    .search(OrderSearchableField)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await allOrderQuery.modelQuery;
  const meta = await allOrderQuery.countTotal();

  return { result, meta };
  */

  const result = await Order.find()
    .sort({ createdAt: -1 })
    .populate('user')
    .populate('medicines.medicine');
  return result;
};

//Get All Product
const getMyOrderService = async (userId: JwtPayload) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(404, 'User not found!');
  }

  const result = await Order.find({ user: user._id })
    .sort({ createdAt: -1 })
    .populate('user')
    .populate('medicines.medicine');
  return result;
};

//Get single Product
const getSingleOrderService = async (id: string) => {
  const result = await Order.findOne({ 'transaction.id': id })
    .populate('user')
    .populate('medicines.medicine');
  if (!result) {
    throw new AppError(404, `Order with ID ${id} not found.`);
  }
  return result;
};
//delete Product
const deleteSingleOrderService = async (id: string) => {
  const orderExist = await Order.findById(id);
  if (!orderExist) {
    throw new AppError(404, `Order with ID ${id} not found.`);
  }
  if (orderExist?.status === 'Paid') {
    throw new AppError(400, `This order can not delete!`);
  }

  const result = await Order.findByIdAndDelete(id);

  if (!result) {
    throw new AppError(404, `Order with ID ${id} not found.`);
  }
  return result;
};
// Update Product
const updateSingleOrderService = async (
  id: string,
  payload: Partial<IOrder>,
) => {
  const result = await Order.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  }).select('-__v');
  if (!result) {
    throw new AppError(404, `Order with ID ${id} not found.`);
  }
  return result;
};
const updateStatusService = async (id: string, payload: { status: string }) => {
  const orderExist = await Order.findById(id);
  if (!orderExist) {
    throw new AppError(404, 'This order not found!');
  }
  const result = await Order.findByIdAndUpdate(orderExist._id, payload, {
    new: true,
  }).select('-__v');
  if (!result) {
    throw new AppError(404, `Order with ID ${id} not found.`);
  }
  return result;
};

const verifyPayment = async (order_id: string) => {
  const verifiedPayment = await orderUtils.verifyPaymentAsync(order_id);

  if (verifiedPayment.length) {
    await Order.findOneAndUpdate(
      {
        'transaction.id': order_id,
      },
      {
        'transaction.bank_status': verifiedPayment[0].bank_status,
        'transaction.sp_code': verifiedPayment[0].sp_code,
        'transaction.sp_message': verifiedPayment[0].sp_message,
        'transaction.transactionStatus': verifiedPayment[0].transaction_status,
        'transaction.method': verifiedPayment[0].method,
        'transaction.date_time': verifiedPayment[0].date_time,
        status:
          verifiedPayment[0].bank_status == 'Success'
            ? 'Paid'
            : verifiedPayment[0].bank_status == 'Failed'
              ? 'Pending'
              : verifiedPayment[0].bank_status == 'Cancel'
                ? 'Cancelled'
                : '',
      },
    );
  }

  return verifiedPayment;
};

export const orderService = {
  addOrderService,
  calculateRevenueService,
  updateSingleOrderService,
  deleteSingleOrderService,
  getSingleOrderService,
  getAllOrderService,
  verifyPayment,
  getMyOrderService,
  updateStatusService,
};
