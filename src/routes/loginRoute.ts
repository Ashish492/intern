import { Router } from "express"
import { bodyValidator } from "../middleware/validator"
import { admin } from "../types/admin"
import { customRouteFunction } from "../utils/asyncErrorHandler"
import { login } from "../controller"
import { config } from "dotenv"
config()
export const loginRoute = Router()
loginRoute.post(
  "/",
  customRouteFunction(bodyValidator(admin)),
  customRouteFunction(login)
)
