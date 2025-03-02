import { Router } from 'express';
import { orderController } from './orders.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../auth/auth.interface';

const orderRouter = Router();

orderRouter.get('/revenue', orderController.totalRevenue);
orderRouter.get(
  '/myOrder',
  auth(USER_ROLE.customer, USER_ROLE.admin),
  orderController.getMyOrder,
);

orderRouter.get(
  '/verify',
  auth(USER_ROLE.customer, USER_ROLE.admin),
  orderController.verifyPayment,
);
orderRouter.patch(
  '/status/:productId',
  auth(USER_ROLE.admin),
  orderController.orderStatusUpdate,
);
orderRouter.get(
  '/:productId',
  auth(USER_ROLE.admin, USER_ROLE.customer),
  orderController.getSingleOrder,
);
orderRouter.put(
  '/:productId',
  auth(USER_ROLE.admin, USER_ROLE.customer),
  orderController.updateOrder,
);
orderRouter.delete(
  '/:productId',
  auth(USER_ROLE.admin, USER_ROLE.customer),
  orderController.deleteOrder,
);
orderRouter.post(
  '/',
  auth(USER_ROLE.customer, USER_ROLE.admin),
  orderController.placeOrder,
);
orderRouter.get('/', auth(USER_ROLE.admin), orderController.getAllOrder);

export default orderRouter;
