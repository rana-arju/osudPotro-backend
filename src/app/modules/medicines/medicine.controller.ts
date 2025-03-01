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


const getStudent = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    // will call service func to send this data
    const result = await MedicineServices.getStudentFromDB(id);

    // send response
    res.status(200).json({
      success: true,
      message: 'Student get succesfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Someting went wrong',
      error,
    });
  }
};

// student delete

const deleteStudent = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    // will call service func to send this data
    const result = await MedicineServices.deleteStudentFromDB(id);

    // send response
    res.status(200).json({
      success: true,
      message: 'Student deleted succesful',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Someting went wrong',
      error,
    });
  }
};

export const medicineController = {
  createMedicine,
  getAllMedicine,
  getStudent,
  deleteStudent,
};
