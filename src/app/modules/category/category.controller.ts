import { NextFunction, Request, Response } from 'express';
import { categoryServices } from './category.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const payload = req.body;
    const result = await categoryServices.createNewCategory(payload);
    res.json({
      status: true,
      message: 'Your category added successful',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const getAllCategory = catchAsync(async (req, res) => {
  const result = await categoryServices.getAllCategoryFromDB();
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Category retrieved successfully',
    data: result,
  });
});

const deleteCategory = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await categoryServices.deleteSingleCategory(id);
  sendResponse(res, {
    statusCode: 200,
    message: 'Category deleted successfully',
    success: true,
    data: result,
  });
});
const getSingleCategory = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await categoryServices.getSingleCategory(id);
  sendResponse(res, {
    statusCode: 200,
    message: 'Category get successfully',
    success: true,
    data: result,
  });
});

export const CategoryController = {
  createCategory,
  getAllCategory,
  deleteCategory,
  getSingleCategory,
};
