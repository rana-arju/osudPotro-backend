import { NextFunction, Request, Response } from 'express';
import { MedicineServices } from './medicine.service';

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

const getAllStudent = async (req: Request, res: Response) => {
  try {
    // will call service func to send this data
    const result = await MedicineServices.getAllStudentFromDB();

    // send response
    res.status(200).json({
      success: true,
      message: 'Students get succesfully',
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
  getAllStudent,
  getStudent,
  deleteStudent,
};
