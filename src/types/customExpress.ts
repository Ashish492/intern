import { NextFunction, Request, Response } from "express"

export type customBodyRequest<T> = Request<{}, {}, T>
type RequestType<T> = T extends undefined ? Request : customBodyRequest<T>
export type CustomRouteFunction<T extends {} | undefined> = (
  req: RequestType<T>,
  res: Response,
  next: NextFunction
) => any
