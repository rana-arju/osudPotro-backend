import { z } from 'zod';

export const medicineValidationSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, 'Medicine name is required.'),
    images: z.array(z.string()).default([]), // Accept array of strings
    quantity: z.number({ required_error: 'Quantity is required.' }),
    type: z.string().min(1, 'Type is required.'),
    usege: z.string().optional(),
    sideEffect: z.string().optional(),
    precautions: z.string().optional(),
    description: z.string().min(1, 'Description is required.'),
    category: z.string().min(1, 'Category is required.'),
    Dosage: z.string().optional(),
    stockavailable: z.boolean().default(true),
    prescription: z.enum(['Yes', 'No']).default('No'),
    expiryDate: z.coerce.date({ required_error: 'Expire date is required' }),
    manufacturer: z.string().min(1, 'Manufacturer details required'),
  }),
});
