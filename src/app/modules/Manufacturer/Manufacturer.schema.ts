import { Schema, model } from 'mongoose';
import { IManufacturer } from './Manufacturer.interface';

const manufacturerSchema = new Schema<IManufacturer>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    

  },
  { timestamps: true },
);

// Create the model
export const Manufacturer = model<IManufacturer>('Manufacturer', manufacturerSchema);
