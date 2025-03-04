import express from 'express';
import { ManufacturerController } from './Manufacturer.controller';
import validationRequest from '../../middleware/validationRequest';
import auth from '../../middleware/auth';
import { manufacturerValidationSchema } from './Manufacturer.validation';
import { USER_ROLE } from '../auth/auth.interface';
const router = express.Router();

// will call controller function

router.post(
  '/',
  auth(USER_ROLE.admin),
  validationRequest(manufacturerValidationSchema),
  ManufacturerController.createManufacturer,
);
router.get('/', ManufacturerController.getAllManufacturer);
router.get(
  '/:id',

  ManufacturerController.getSingleManufacturer,
);
router.delete(
  '/:id',
  auth(USER_ROLE.admin),
  ManufacturerController.deleteManufacturer,
);
router.patch(
  '/:id',
  auth(USER_ROLE.admin),
  ManufacturerController.updateManufacturer,
);

export const ManufacturerRoutes = router;
