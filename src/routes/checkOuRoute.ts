import { Router } from "express"
import { bodyValidator } from "../middleware"
import { CheckOut } from "../types"
import { getCheckOutController } from "../controller"
import { customRouteFunction } from "../utils/asyncErrorHandler"

export const checkOutRouter = Router()
checkOutRouter
  .route("/")
  .post(
    customRouteFunction(bodyValidator(CheckOut.omit({ id: true }))),
    customRouteFunction(getCheckOutController)
  )
