import { Router } from "express"
import { insertCheckout } from "../model"
import { bodyValidator } from "../middleware"
import { CheckOut } from "../types"

export const checkOutRouter = Router()
checkOutRouter
  .route("/")
  .post(bodyValidator(CheckOut.omit({ id: true })), insertCheckout)
