import { z } from "zod"

export const admin = z
  .object({
    username: z.string(),
    password: z.string(),
  })
  .strict()
export type ADMIN = z.infer<typeof admin>
