import { Router } from "express"
import { login } from "../controller"
import { itemRouter } from "./itemRoute"
import { getCheckOut } from "../model"

export const adminRoute = Router()
adminRoute.route("/login").post(login)
adminRoute.use("/item", itemRouter)
adminRoute.get("/checkOut", getCheckOut)
