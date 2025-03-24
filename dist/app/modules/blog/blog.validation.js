"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectValidation = void 0;
const zod_1 = require("zod");
const blogValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z
            .string({
            required_error: 'Title must be provided and must be a string',
        })
            .min(4)
            .max(50),
        image: zod_1.z.string({
            required_error: 'Blog image added',
        }),
        tags: zod_1.z
            .string({
            required_error: 'Tags required',
        })
            .array(),
        content: zod_1.z
            .string({
            required_error: 'Content is required!',
        })
            .min(20),
    }),
});
exports.projectValidation = {
    projectValidationSchema: blogValidationSchema,
};
