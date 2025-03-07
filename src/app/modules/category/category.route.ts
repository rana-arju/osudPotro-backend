import express from 'express';
import validationRequest from '../../middleware/validationRequest';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../auth/auth.interface';
import { categoryValidationSchema } from './category.validation';
import { CategoryController } from './category.controller';
const router = express.Router();

// will call controller function

router.post(
  '/',
  auth(USER_ROLE.admin),
  validationRequest(categoryValidationSchema),
  CategoryController.createCategory,
);
router.get('/', CategoryController.getAllCategory);
router.get(
  '/:id',

  CategoryController.getSingleCategory,
);
router.delete('/:id', auth(USER_ROLE.admin), CategoryController.deleteCategory);
router.patch('/:id', auth(USER_ROLE.admin), CategoryController.updateCategory);

export const CategoryRoutes = router;
