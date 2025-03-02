"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.manufacturerValidationSchema = void 0;
const zod_1 = require("zod");
exports.manufacturerValidationSchema = zod_1.z.object({
    name: zod_1.z.string(),
    description: zod_1.z.string({
        required_error: 'Description is required.',
    }),
});
