import { NextFunction, Request, Response } from "express"
import { ZodType } from "zod"

/* validates request body using zod */
export function bodyValidator(T: ZodType) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await T.parseAsync(req.body)
      next()
    } catch (error) {
      throw error
    }
  }
}
