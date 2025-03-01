import { Schema, model } from 'mongoose';
import { IMedicine } from './medicine.interface';



const medicineSchema = new Schema<IMedicine>(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Medicine name is required.'],
    },

    images: [String],
    quantity: { type: Number, required: true },
    type: {
      type: String,
      required: true,
    },
    usege: {
      type: String,
    },
    sideEffect: {
      type: String,
    },
    precautions: {
      type: String,
    },
    description: {
      type: String,
      required: [true, 'Description is required.'],
    },
    category: {
      type: String,
      required: [true, 'Category is required.'],
    },
    Dosage: {
      type: String,
    },
    stockavailable: { type: Boolean, default: true },
    prescription: { type: String, enum: ['Yes', 'No'], default: 'No' },
    expiryDate: {
      type: Date,
      required: [true, 'Expire date is required'],
    },
    manufacturer: {
      type: String,
      required: [true, 'Manufacturer details required'],
    },
  },
  { timestamps: true },
);

// creating a custom instance method

/* studentSchema.methods.isUserExists = async function (id:string) {
  const existingUser = await Student.findOne({id})
  return existingUser
  
}
  */
// creating a custom method

// Create the model
export const Medicine = model<IMedicine>(
  'Medicine',
  medicineSchema,
);
