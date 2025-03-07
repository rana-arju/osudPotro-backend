"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewValidationSchema = void 0;
const zod_1 = require("zod");
exports.reviewValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        user: zod_1.z.string({
            required_error: 'User not found',
        }),
        comment: zod_1.z
            .string({
            required_error: 'Description is required.',
        })
            .min(5, 'Write at least 5 char on review'),
        rating: zod_1.z.number({
            required_error: 'Rating is required',
        }),
    }),
});
