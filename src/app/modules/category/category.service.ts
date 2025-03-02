import AppError from '../../error/AppError';
import { ICategory } from './category.interface';
import { Category } from './category.schema';

//create medicine
const createNewCategory = async (payload: ICategory) => {
  const result = await Category.create(payload);
  return result;
};

//Get All medicine
const getAllCategoryFromDB = async () => {
  const result = await Category.find();

  return result;
};

const deleteSingleCategory = async (id: string) => {
  const categoryExist = await Category.findById(id);
  if (!categoryExist) {
    throw new AppError(404, 'This category not found!');
  }
  const result = await Category.findByIdAndDelete(id);
  return result;
};
const getSingleCategory = async (id: string) => {
  const categoryExist = await Category.findById(id);
  if (!categoryExist) {
    throw new AppError(404, 'This category not found!');
  }
  const result = await Category.findById(id);
  return result;
};

export const categoryServices = {
  createNewCategory,
  getAllCategoryFromDB,
  getSingleCategory,
  deleteSingleCategory,
};
