import { z } from "zod"
import validator from "validator"
export interface TODO {
  id?: number
  body: string
  types?: TYPES
  order?: number
}
const todo = z.object({
  id: z.number().optional(),
  body: z
    .string()
    .trim()
    .transform(v => validator.escape(v)),
})
export const enum TYPES {
  TODO,
  INPROGRESS,
  TESTING,
  DONE,
}
// declare module "knex/types/tables" {
//   interface Todo extends TODO {}
// }
