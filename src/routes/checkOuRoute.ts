import { Router } from "express"
import { bodyValidator } from "../middleware"
import { CheckOut } from "../types"
import { customRouteFunction } from "../utils/asyncErrorHandler"
import { addCheckOut } from "../controller"

export const checkOutRouter = Router()
checkOutRouter
  .route("/")
  .post(
    customRouteFunction(
      bodyValidator(CheckOut.omit({ id: true, total: true }))
    ),
    customRouteFunction(addCheckOut)
  )
