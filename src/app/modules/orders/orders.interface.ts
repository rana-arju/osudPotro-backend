import { Document, Types } from 'mongoose';

export interface IOrder extends Document {
  user: Types.ObjectId;
  medicines: {
    medicine: Types.ObjectId;
    quantity: number;
  }[];
  shippingInfo: {
    address: string;
    city: string;
    phone: string;
  };
  totalPrice: number;
  status:
    | 'Pending'
    | 'Paid'
    | 'Processing'
    | 'Shipped'
    | 'Delivered'
    | 'Cancelled';
  transaction: {
    id: string;
    transactionStatus: string;
    bank_status: string;
    sp_code: string;
    sp_message: string;
    method: string;
    date_time: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}
