import { z } from "zod"
import validator from 'validator';

export const Item = z
  .object({
    id: z.number().optional(),
    name: z.string().refine(v => !validator.isEmpty(v), { message: "empty value for body" }),
    price: z.number().min(1),
    store: z.string().refine(v => !validator.isEmpty(v), { message: "empty value for body" }),
  })
  .strict()
export type ITEM = z.infer<typeof Item>
