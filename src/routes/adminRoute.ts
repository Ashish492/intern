import { Router } from "express"
import { getCheckOutController, login } from "../controller"
import { itemRouter } from "./itemRoute"
import { customRouteFunction } from "../utils"

export const adminRoute = Router()

adminRoute.get("/checkOut", customRouteFunction(getCheckOutController))
