import { NextFunction, Request, Response } from 'express';
import { MedicineServices } from './medicine.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const createMedicine = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const payload = req.body;
    const result = await MedicineServices.createMedicineIntoDB(payload);
    res.json({
      status: true,
      message: 'New medicine added successful',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const getAllMedicine = catchAsync(async (req, res) => {
  const result = await MedicineServices.getAllMedicineFromDB(req.query);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Medicine retrieved successfully',
    data: result?.result,
    meta: result?.meta,
  });
});


// Single Product get controller
const getSingleMedicine = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const result = await MedicineServices.getSingleMedicine(id);

    res.json({
      status: true,
      message: 'Medicine retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
// student delete

const deleteMedicine= catchAsync(async (req, res) => {
  const { id} = req.params;

  const result = await MedicineServices.deleteSingleMedicine(id);
  sendResponse(res, {
    statusCode: 200,
    message: 'Medicine deleted successfully',
    success: true,
    data: result,
  });
});
const updatMedicine = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {id } = req.params;
    const payload = req.body;

    const result = await MedicineServices.updateSingleMedicine(
      id,
      payload,
    );

    res.json({
      status: true,
      message: 'Medicine updated successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export const medicineController = {
  createMedicine,
  getAllMedicine,
  getSingleMedicine,
  deleteMedicine,
  updatMedicine,
};
