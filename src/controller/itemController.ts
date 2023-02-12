import { Response } from "express"
import { add, deleteById, update } from "../model"
import { customBodyRequest } from "../types/todo"
import { ITEM } from "../types"
export async function addItem(req: customBodyRequest<ITEM>, res: Response) {
  const { name, price, store } = req.body
  await add({ name, price, store })
}
export async function deleteItem(
  req: customBodyRequest<{ id: number }>,
  res: Response
) {
  const { id } = req.body
  await deleteById(id)
}
export async function updateItem(
  req: customBodyRequest<{ data: Omit<ITEM, "id">; id: number }>,
  res: Response
) {
  const { data, id } = req.body
  await update(data, id)
}
