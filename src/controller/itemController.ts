import { Request, Response } from "express"
import { add, deleteById, getItemModel, update } from "../model"
import { customBodyRequest, ITEM } from "../types"
export async function addItem(req: customBodyRequest<ITEM>, res: Response) {
  const { name, price, store } = req.body
  const item = await add({ name, price, store })
  res.json({ item })
}
export async function deleteItem(
  req: customBodyRequest<{ id: number }>,
  res: Response
) {
  const { id } = req.body
  const item = await deleteById(id)
  res.json({ success: true, data: item })
}
export async function updateItem(
  req: customBodyRequest<{ data: Omit<ITEM, "id">; id: number }>,
  res: Response
) {
  const { data, id } = req.body
  const item = await update(data, id)
  res.json({ success: true, data: item })
}
export async function getItem(req: Request, res: Response) {
  const item = await getItemModel()
  res.json({ success: true, data: item })
}
