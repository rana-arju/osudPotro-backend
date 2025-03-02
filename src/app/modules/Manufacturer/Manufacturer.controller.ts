import { NextFunction, Request, Response } from 'express';
import { manufacturerServices } from './Manufacturer.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const createManufacturer = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const payload = req.body;
    const result = await manufacturerServices.createNewManufacturer(payload);
    res.json({
      status: true,
      message: 'Your Manufacturer added successful',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const getAllManufacturer = catchAsync(async (req, res) => {
  const result = await manufacturerServices.getAllManufacturerFromDB();
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Manufacturer retrieved successfully',
    data: result,
  });
});

const deleteManufacturer = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await manufacturerServices.deleteSingleManufacturer(id);
  sendResponse(res, {
    statusCode: 200,
    message: 'Manufacturer deleted successfully',
    success: true,
    data: result,
  });
});
const getSingleManufacturer = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await manufacturerServices.getSingleManufacturer(id);
  sendResponse(res, {
    statusCode: 200,
    message: 'Manufacturer get successfully',
    success: true,
    data: result,
  });
});

export const ManufacturerController = {
  createManufacturer,
  getAllManufacturer,
  deleteManufacturer,
  getSingleManufacturer,
};
