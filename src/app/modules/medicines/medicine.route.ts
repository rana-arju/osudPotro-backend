import express from 'express';
import { medicineController } from './medicine.controller';
import validationRequest from '../../middleware/validationRequest';
import { medicineValidationSchema } from './medicine.validation';
const router = express.Router();

// will call controller function

router.post(
  '/',
  validationRequest(medicineValidationSchema),
  medicineController.createMedicine,
);
router.get('/', medicineController.getAllMedicine);
router.get('/:id', medicineController.getSingleMedicine);
router.delete('/:id', medicineController.deleteMedicine);
router.patch(
  '/:id',
  validationRequest(medicineValidationSchema),
  medicineController.updatMedicine,
);

export const MedicineRoutes = router;
