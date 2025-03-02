import { Types } from "mongoose";

export interface IMedicine {
  name: string;
  images: string[];
  price: number;
  quantity: number;
  type: string;
  usege?: string;
  sideEffect?: string;
  precautions?: string;
  description: string;
  category: Types.ObjectId;
  Dosage?: string;
  stockavailable: boolean;
  prescription: 'Yes' | 'No';
  expiryDate: Date;
  manufacturer: Types.ObjectId;
}
