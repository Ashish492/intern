import { Router } from "express"
import { addItem, deleteItem, getItem, updateItem } from "../controller"
import { bodyValidator } from "../middleware/validator"
import { Item } from "../types"
import { z } from "zod"
import { customRouteFunction } from "../utils/asyncErrorHandler"
import { auth } from "../middleware"
export const itemRouter = Router()

const UpdateItem = z.object({
  id: z.number(),
  data: Item.omit({ id: true }),
})
const Id = Item.pick({ id: true }).required()
itemRouter
  .route("/")
  .post(
    customRouteFunction(bodyValidator(Item.omit({ id: true }))),
    customRouteFunction(addItem)
  )
  .get(customRouteFunction(getItem))
  .put(
    customRouteFunction(bodyValidator(UpdateItem)),
    customRouteFunction(updateItem)
  )
  .delete(
    customRouteFunction(bodyValidator(Id)),
    customRouteFunction(deleteItem)
  )
