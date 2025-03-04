import express from 'express';
import { medicineController } from './medicine.controller';
import validationRequest from '../../middleware/validationRequest';
import { medicineValidationSchema } from './medicine.validation';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../auth/auth.interface';
const router = express.Router();

// will call controller function

router.post(
  '/',
  auth(USER_ROLE.admin),
  validationRequest(medicineValidationSchema),
  medicineController.createMedicine,
);
router.get('/', medicineController.getAllMedicine);
router.get('/:id', medicineController.getSingleMedicine);
router.delete('/:id',auth(USER_ROLE.admin), medicineController.deleteMedicine);
router.patch(
  '/:id',
  auth(USER_ROLE.admin),
  validationRequest(medicineValidationSchema),
  medicineController.updatMedicine,
);

export const MedicineRoutes = router;
