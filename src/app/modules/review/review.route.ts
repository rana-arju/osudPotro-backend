import express from 'express';
import { medicineController } from './review.controller';
import validationRequest from '../../middleware/validationRequest';
import { reviewValidationSchema } from './review.validation';
const router = express.Router();

// will call controller function

router.post(
  '/',
  validationRequest(reviewValidationSchema),
  medicineController.createReview,
);
router.get('/', medicineController.getAllReview);
router.delete('/:id', medicineController.deleteReview);

export const ReviewRoutes = router;
