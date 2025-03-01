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
router.get('/:id', medicineController.getStudent);
router.delete('/:id', medicineController.deleteStudent);

export const MedicineRoutes = router;
