import { NextFunction, Request, Response } from 'express';
import { reviewServices } from './review.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const createReview = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const payload = req.body;
    const result = await reviewServices.createNewReview(payload);
    res.json({
      success: true,
      message: 'Your review added successful',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const getAllReview = catchAsync(async (req, res) => {
  const result = await reviewServices.getAllReviewFromDB(req.query);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Review retrieved successfully',
    data: result
   
  });
});

const deleteReview = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await reviewServices.deleteSingleReview(id);
  sendResponse(res, {
    statusCode: 200,
    message: 'Review deleted successfully',
    success: true,
    data: result,
  });
});

export const medicineController = {
  createReview,
  getAllReview,
  deleteReview,
};
