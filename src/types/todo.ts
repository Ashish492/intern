import { z } from "zod"
import validator from "validator"
import { Request } from "express"
// export interface TODO {
//   id?: number
//   body: string
//   types?: TYPES
//   order?: number
// }
export enum TYPES {
  TODO,
  INPROGRESS,
  TESTING,
  DONE,
}
export const todo = z.object({
  id: z.number().optional(),
  body: z
    .string()
    .trim()
    .transform(v => validator.escape(v))
    .refine(v => !validator.isEmpty(v), { message: "empty value for body" }),
  types: z.nativeEnum(TYPES).optional(),
  order: z.number().optional(),
  rank: z.number().optional(),
})
export type TODO = z.infer<typeof todo>
