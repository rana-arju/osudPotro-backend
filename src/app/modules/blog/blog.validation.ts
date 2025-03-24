import { z } from 'zod';

const blogValidationSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Title must be provided and must be a string',
      })
      .min(4)
      .max(50),

    image: z.string({
      required_error: 'Blog image added',
    }),
    tags: z
      .string({
        required_error: 'Tags required',
      })
      .array(),
    content: z
      .string({
        required_error: 'Content is required!',
      })
      .min(20),
  }),
});

export const projectValidation = {
  projectValidationSchema: blogValidationSchema,
};