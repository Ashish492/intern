import { getCheckOut, insertCheckout } from "../model"
import { CHECKOUT, CustomRouteFunction } from "../types"
export const addCheckOut: CustomRouteFunction<
  Omit<CHECKOUT, "total" | "id">
> = async (req, res) => {
  const id = (await insertCheckout(req.body))[0]
  res.json({ success: true, msg: "checkOut successfully", data: { id } })
}
export const getCheckOutController: CustomRouteFunction<undefined> = async (
  req,
  res
) => {
  const checkouts = await getCheckOut()
  res.json(checkouts)
}
