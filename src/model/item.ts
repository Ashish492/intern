import { ITEM } from "../types"
import db from "../utils/connection"

async function add(item: ITEM) {
  try {
    return await db<ITEM>().insert(item, "*")
  } catch (error) {
    throw new CustomError("unable to update item", 502, {
      cause: error,
    })
  }
}

async function update(item: Partial<ITEM>, id: number) {
  try {
    return await db<ITEM>().update(item, "*").where("id", id)
  } catch (error) {
    throw new CustomError("unable to delete item", 502, {
      cause: error,
    })
  }
}
async function deleteById(id: number) {}
