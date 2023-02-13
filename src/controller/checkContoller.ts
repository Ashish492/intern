import { getCheckOut, insertCheckout } from "../model"
import { CHECKOUT, CustomRouteFunction } from "../types"
export const addCheckOut: CustomRouteFunction<
  Omit<CHECKOUT, "total" | "id">
> = async (req, res) => {
  const checkout = await insertCheckout(req.body)
  res.json({ success: true, data: checkout })
}
export const getCheckOutController: CustomRouteFunction<undefined> = async (
  req,
  res
) => {
  const checkouts = await getCheckOut()
  res.json({ checkouts })
}
