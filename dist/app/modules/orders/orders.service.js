"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderService = void 0;
const AppError_1 = __importDefault(require("../../error/AppError"));
const order_utils_1 = require("./order.utils");
const orders_model_1 = require("./orders.model");
const auth_model_1 = require("../auth/auth.model");
const medicine_schema_1 = require("../medicines/medicine.schema");
//Place order
const addOrderService = (userId, payload, client_ip) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    if (!((_a = payload === null || payload === void 0 ? void 0 : payload.medicines) === null || _a === void 0 ? void 0 : _a.length))
        throw new AppError_1.default(406, 'Order is not specified');
    const user = yield auth_model_1.User.findById(userId);
    if (!user) {
        throw new AppError_1.default(404, 'User not found');
    }
    const { address, city, phone, customer } = payload.shippingInfo;
    //user update
    const updatedUser = yield auth_model_1.User.findByIdAndUpdate(user._id, {
        address,
        city,
        phone,
    }, { new: true });
    const medicines = payload.medicines;
    let totalPrice = 0;
    const medicineDetails = yield Promise.all(medicines.map((item) => __awaiter(void 0, void 0, void 0, function* () {
        const medicine = yield medicine_schema_1.Medicine.findById(item.medicine);
        if (medicine) {
            if ((item === null || item === void 0 ? void 0 : item.quantity) > (medicine === null || medicine === void 0 ? void 0 : medicine.quantity)) {
                throw new Error(`Insufficient stock for product "${medicine.name}". Only ${medicine.quantity} items left.`);
            }
            const updateQuantity = (medicine === null || medicine === void 0 ? void 0 : medicine.quantity) - (item === null || item === void 0 ? void 0 : item.quantity);
            yield medicine_schema_1.Medicine.findByIdAndUpdate(medicine === null || medicine === void 0 ? void 0 : medicine._id, {
                quantity: updateQuantity,
            });
            const subtotal = medicine ? (medicine.price || 0) * item.quantity : 0;
            totalPrice = totalPrice + subtotal + payload.shippingFee;
            return item;
        }
    })));
    //create order
    let order = yield orders_model_1.Order.create({
        user: user._id,
        medicines: medicineDetails,
        totalPrice,
        prescriptionImage: payload === null || payload === void 0 ? void 0 : payload.prescriptionImage,
        customer: (_b = payload === null || payload === void 0 ? void 0 : payload.shippingInfo) === null || _b === void 0 ? void 0 : _b.customer,
    });
    // payment integration
    const shurjopayPayload = {
        amount: totalPrice.toFixed(2),
        order_id: order._id,
        currency: 'BDT',
        customer_name: customer || (updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.name),
        customer_address: address || (updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.address),
        customer_email: updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.email,
        customer_phone: phone || (updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.phone),
        customer_city: city || (updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.city),
        client_ip,
    };
    const payment = yield order_utils_1.orderUtils.makePaymentAsync(shurjopayPayload);
    if (payment === null || payment === void 0 ? void 0 : payment.transactionStatus) {
        order = yield order.updateOne({
            transaction: {
                id: payment.sp_order_id,
                transactionStatus: payment.transactionStatus,
            },
        });
    }
    return payment.checkout_url;
});
//Calculate Order revenue
const calculateRevenueService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield orders_model_1.Order.aggregate([
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
});
//Get All Product
const getAllOrderService = () => __awaiter(void 0, void 0, void 0, function* () {
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
    const result = yield orders_model_1.Order.find()
        .sort({ createdAt: -1 })
        .populate('user')
        .populate('medicines.medicine');
    return result;
});
//Get All Product
const getMyOrderService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield auth_model_1.User.findById(userId);
    if (!user) {
        throw new AppError_1.default(404, 'User not found!');
    }
    const result = yield orders_model_1.Order.find({ user: user._id })
        .sort({ createdAt: -1 })
        .populate('user')
        .populate('medicines.medicine');
    return result;
});
//Get single Product
const getSingleOrderService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield orders_model_1.Order.findOne({ 'transaction.id': id })
        .populate('user')
        .populate('medicines.medicine');
    if (!result) {
        throw new AppError_1.default(404, `Order with ID ${id} not found.`);
    }
    return result;
});
//delete Product
const deleteSingleOrderService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const orderExist = yield orders_model_1.Order.findById(id);
    if (!orderExist) {
        throw new AppError_1.default(404, `Order with ID ${id} not found.`);
    }
    if ((orderExist === null || orderExist === void 0 ? void 0 : orderExist.status) === 'Paid') {
        throw new AppError_1.default(400, `This order can not delete!`);
    }
    const result = yield orders_model_1.Order.findByIdAndDelete(id);
    if (!result) {
        throw new AppError_1.default(404, `Order with ID ${id} not found.`);
    }
    return result;
});
// Update Product
const updateSingleOrderService = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield orders_model_1.Order.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    }).select('-__v');
    if (!result) {
        throw new AppError_1.default(404, `Order with ID ${id} not found.`);
    }
    return result;
});
const updateStatusService = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const orderExist = yield orders_model_1.Order.findById(id);
    if (!orderExist) {
        throw new AppError_1.default(404, 'This order not found!');
    }
    const result = yield orders_model_1.Order.findByIdAndUpdate(orderExist._id, payload, {
        new: true,
    }).select('-__v');
    if (!result) {
        throw new AppError_1.default(404, `Order with ID ${id} not found.`);
    }
    return result;
});
const verifyPayment = (order_id) => __awaiter(void 0, void 0, void 0, function* () {
    const verifiedPayment = yield order_utils_1.orderUtils.verifyPaymentAsync(order_id);
    if (verifiedPayment.length) {
        yield orders_model_1.Order.findOneAndUpdate({
            'transaction.id': order_id,
        }, {
            'transaction.bank_status': verifiedPayment[0].bank_status,
            'transaction.sp_code': verifiedPayment[0].sp_code,
            'transaction.sp_message': verifiedPayment[0].sp_message,
            'transaction.transactionStatus': verifiedPayment[0].transaction_status,
            'transaction.method': verifiedPayment[0].method,
            'transaction.date_time': verifiedPayment[0].date_time,
            status: verifiedPayment[0].bank_status == 'Success'
                ? 'Paid'
                : verifiedPayment[0].bank_status == 'Failed'
                    ? 'Pending'
                    : verifiedPayment[0].bank_status == 'Cancel'
                        ? 'Cancelled'
                        : '',
        });
    }
    return verifiedPayment;
});
exports.orderService = {
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
