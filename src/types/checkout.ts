import { z } from "zod"
import validator from "validator"

export const CheckOut = z.object({
  id: z.number(),
  name: z
    .string()
    .refine(v => !validator.isEmpty(v), { message: "empty value for body" }),
  email: z
    .string()
    .email()
    .refine(v => !validator.isEmpty(v), { message: "empty value for body" }),
  phone: z
    .string()
    .length(10)
    .refine(Number.isSafeInteger, { message: "enter valid number" }),
  itemId: z.number(),
  count: z.number().min(1),
  total: z.number(),
})
export type CHECKOUT = z.infer<typeof CheckOut>
