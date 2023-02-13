import { Router } from "express"
import { getCheckOutController, login } from "../controller"
import { itemRouter } from "./itemRoute"
import { customRouteFunction } from '../utils/asyncErrorHandler';

export const adminRoute = Router()
adminRoute.route("/login").post(customRouteFunction(login))
adminRoute.use("/item",customRouteFunction( itemRouter))
adminRoute.get("/checkOut",customRouteFunction( getCheckOutController))
