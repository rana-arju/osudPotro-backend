import express from 'express';
import { medicineController } from './review.controller';
import validationRequest from '../../middleware/validationRequest';
import { reviewValidationSchema } from './review.validation';
import auth from '../../middleware/auth';
const router = express.Router();

// will call controller function

router.post(
  '/',
  auth('customer', 'admin'),
  validationRequest(reviewValidationSchema),
  medicineController.createReview,
);
router.get('/', medicineController.getAllReview);
router.delete('/:id',auth("customer", "admin"), medicineController.deleteReview);

export const ReviewRoutes = router;
