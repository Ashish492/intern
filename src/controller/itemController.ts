import { add, deleteById, getItemModel, update } from "../model"
import { CustomRouteFunction, ITEM } from "../types"
export const addItem: CustomRouteFunction<ITEM> = async (req, res) => {
  const { name, price, store } = req.body
  const id = (await add({ name, price, store }))[0]
  res.json({
    success: true,
    msg: "item added",
    data: { id, name, price, store },
  })
}
export const deleteItem: CustomRouteFunction<{ id: number }> = async (
  req,
  res
) => {
  const { id } = req.body
  const item = await deleteById(id)
  res.json({ success: true, msg: "item deleted", data: { id } })
}
export const updateItem: CustomRouteFunction<{
  data: Omit<ITEM, "id">
  id: number
}> = async (req, res) => {
  const { data, id } = req.body
  const item = await update(data, id)
  res.json({ success: true, msg: "item updated", data: { ...data, id } })
}
export const getItem: CustomRouteFunction<undefined> = async (req, res) => {
  const item = await getItemModel()
  res.json(item)
}
