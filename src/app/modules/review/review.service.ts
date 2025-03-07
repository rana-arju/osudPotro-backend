import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../error/AppError';
import { IReview } from './review.interface';
import { Review } from './review.schema';


//create medicine
const createNewReview = async (reviewData: IReview) => {
  const result = await Review.create(reviewData);
  return result;
};

//Get All medicine
const getAllReviewFromDB = async (searchTerm: Record<string, unknown>) => {
 const result = await Review.find().populate("user");

  return result;
};

const deleteSingleReview = async (id: string) => {
  const review = await Review.findById(id);
  if (!review) {
    throw new AppError(404, 'This review not found!');
  }
  const result = await Review.findByIdAndDelete(id);
  return result;
};

export const reviewServices = {
  createNewReview,
  getAllReviewFromDB,

  deleteSingleReview,
};
