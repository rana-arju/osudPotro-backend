import { Router } from 'express';
import { orderController } from './orders.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../auth/auth.interface';

const router = Router();
router.get('/revenue', orderController.totalRevenue);
router.get(
  '/myOrder',
  auth(USER_ROLE.customer, USER_ROLE.admin),
  orderController.getMyOrder,
);

router.get(
  '/verify',
  auth(USER_ROLE.customer, USER_ROLE.admin),
  orderController.verifyPayment,
);
router.patch(
  '/status/:productId',
  auth(USER_ROLE.admin),
  orderController.orderStatusUpdate,
);
router.get(
  '/:productId',
  auth(USER_ROLE.admin, USER_ROLE.customer),
  orderController.getSingleOrder,
);
router.put(
  '/:productId',
  auth(USER_ROLE.admin, USER_ROLE.customer),
  orderController.updateOrder,
);
router.delete(
  '/:productId',
  auth(USER_ROLE.admin, USER_ROLE.customer),
  orderController.deleteOrder,
);
router.post(
  '/',
  auth(USER_ROLE.customer, USER_ROLE.admin),
  orderController.placeOrder,
);
router.get('/', auth(USER_ROLE.admin), orderController.getAllOrder);

export const OrderRoutes = router;

