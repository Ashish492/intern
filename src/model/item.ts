import CustomError from "../Error/CustomError"
import { ITEM } from "../types"
import db from "../utils/connection"
import { insert } from "./generic"
export async function add(item: ITEM) {
  return await insert<ITEM>(item, "Items")
}
export async function update(item: Partial<Omit<ITEM, "id">>, id: number) {
  try {
    return await db<ITEM>("Items").update(item).where("id", id)
  } catch (error) {
    throw new CustomError("unable to update item", 502, {
      cause: error,
    })
  }
}
export async function deleteById(id: number) {
  try {
    return await db<ITEM>("Items").where({ id }).del("*")
  } catch (error) {
    throw new CustomError("unable to delete item", 502, {
      cause: error,
    })
  }
}
export async function getItemModel() {
  try {
    const item = await db<ITEM>("Items").select("*")
    return item
  } catch (error) {
    throw new CustomError("unable to get item", 502, {
      cause: error,
    })
  }
}
