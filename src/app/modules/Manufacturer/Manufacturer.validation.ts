import { z } from 'zod';

export const manufacturerValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    description: z.string({
      required_error: 'Description is required.',
    }),
  }),
});
