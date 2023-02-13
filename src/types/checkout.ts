import { z } from "zod"

export const CheckOut = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  phone: z
    .string()
    .length(10)
    .refine(Number.isSafeInteger, { message: "enter valid number" }),
  itemId: z.number(),
  count: z.number().min(1),
  total: z.number(),
})
export type CHECKOUT = z.infer<typeof CheckOut>
