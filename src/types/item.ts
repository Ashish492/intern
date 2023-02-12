import { z } from "zod"

export const Item = z
  .object({
    id: z.number().optional(),
    name: z.string(),
    price: z.number().min(1),
    store: z.string(),
  })
  .strict()
export type ITEM = z.infer<typeof Item>
