import { z } from 'zod';

export const reviewValidationSchema = z.object({
  body: z.object({
    user: z.string({
      required_error: 'User not found',
    }),
    comment: z
      .string({
        required_error: 'Description is required.',
      })
      .min(5, 'Write at least 5 char on review'),
    rating: z.number({
      required_error: 'Rating is required',
    }),
  }),
});
