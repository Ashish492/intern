import { Router } from "express"
import { addItem, deleteItem, getItem, updateItem } from "../controller"
import { bodyValidator } from "../middleware/validator"
import { Item } from "../types"
import { z } from "zod"
export const itemRouter = Router()

const UpdateItem = z.object({
  id: z.number(),
  data: Item.omit({ id: true }),
})
const Id = Item.pick({ id: true }).required()
itemRouter
  .route("/")
  .post(bodyValidator(Item.omit({ id: true })), addItem)
  .get(getItem)
  .put(bodyValidator(UpdateItem), updateItem)
  .delete(bodyValidator(Id), deleteItem)
