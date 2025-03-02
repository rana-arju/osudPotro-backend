import { Types } from 'mongoose';

export interface IReview {
  user: Types.ObjectId;
  comment: string;
  rating: number;
}
