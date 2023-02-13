import CustomError from "../Error/CustomError"
import { CHECKOUT, ITEM } from "../types"
import db from "../utils/connection"
import { insert } from "./generic"

export async function insertCheckout(
  checkOutItem: Omit<CHECKOUT, "total" | "id">
) {
  const price = (
    await db<ITEM>("item").select("price").where("id", checkOutItem.itemId)
  )[0].price
  return await insert<Omit<CHECKOUT, "id">>(
    { ...checkOutItem, total: price * checkOutItem.count },
    "checkOut"
  )
}
export async function getCheckOut() {
  try {
    await db<CHECKOUT>("checkOut").select("*")
  } catch (error) {
    throw new CustomError("database error", 502)
  }
}
