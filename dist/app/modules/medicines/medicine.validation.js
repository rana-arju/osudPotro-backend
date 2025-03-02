"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.medicineValidationSchema = void 0;
const zod_1 = require("zod");
exports.medicineValidationSchema = zod_1.z.object({
    name: zod_1.z.string().trim().min(1, 'Medicine name is required.'),
    images: zod_1.z.array(zod_1.z.string()).default([]), // Accept array of strings
    quantity: zod_1.z.number({ required_error: 'Quantity is required.' }),
    type: zod_1.z.string().min(1, 'Type is required.'),
    usege: zod_1.z.string().optional(),
    sideEffect: zod_1.z.string().optional(),
    precautions: zod_1.z.string().optional(),
    description: zod_1.z.string().min(1, 'Description is required.'),
    category: zod_1.z.string().min(1, 'Category is required.'),
    Dosage: zod_1.z.string().optional(),
    stockavailable: zod_1.z.boolean().default(true),
    prescription: zod_1.z.enum(['Yes', 'No']).default('No'),
    expiryDate: zod_1.z.coerce.date({ required_error: 'Expire date is required' }),
    manufacturer: zod_1.z.string().min(1, 'Manufacturer details required'),
});
