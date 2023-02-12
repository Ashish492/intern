import { NextFunction, Request, Response } from "express"
import { ZodType } from "zod"

/* validates request body using zod */
export function bodyValidator(T: ZodType) {
  return async (req: Request, res: Response, next: NextFunction) => {
    await T.parseAsync(req.body)
    next()
  }
}
