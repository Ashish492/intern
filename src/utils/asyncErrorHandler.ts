import { NextFunction, Request, Response } from "express"
type basicFun = (req: Request, res: Response, next: NextFunction) => any
export function customRouteFunction(fn: basicFun) {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next)
  }
}
