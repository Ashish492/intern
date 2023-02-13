import CustomError from "../Error/CustomError"
import { TODO, TYPES } from "../types"
import db from "../utils/connection"
async function get(type: TYPES = TYPES.TODO) {
  try {
    let todo = await db<TODO>("todo")
      .select("*")
      .where("types", type)
      .orderBy("rank", "asc")
    return todo.map((t, key) => ({ ...t, rank: key }))
  } catch (error) {
    throw new CustomError("unable to find err", 502, {
      cause: error,
    })
  }
}
export async function getTodo() {
  return await get(TYPES.TODO)
}
export async function getProgressing() {
  return await get(TYPES.INPROGRESS)
}
export async function getTesting() {
  return await get(TYPES.TESTING)
}
export async function getDone() {
  return await get(TYPES.DONE)
}
export async function updateRank(id: number, rank: number) {
  try {
    let actualRank = (
      await db.raw(
        "select rank from todo where type=(select type from todo where id=?) order by rank",
        [id]
      )
    )["order"]
    if (typeof actualRank === undefined) {
      throw new Error("order must be a valid")
    }
    let todo = await db<TODO>("todo")
      .update({ rank: actualRank }, "*")
      .where({ id })
    await db.raw("set SQL_SAFE_UPDATES=0")
    await db.raw("update to set rank=rank+1 where order >=?", [actualRank])
    await db.raw("set SQL_SAFE_UPDATES=1")
    return todo
  } catch (error) {
    throw new CustomError("unable to update", 502, {
      cause: error,
    })
  }
}
export async function move(id: number, types: TYPES) {
  try {
    let todo = await db<TODO>("todo").update({ types }, "*").where({ id })
    return todo
  } catch (error) {
    throw new CustomError("unable to insert", 502, {
      cause: error,
    })
  }
}
export async function insertTodo(todo: Pick<TODO, "body">) {
  try {
    const orderCol =
      (
        await db<TODO>("todo").select("order").orderBy("order", "desc").limit(1)
      )[0].order ?? 1
    const res = await db<TODO>("todo").insert(
      { ...todo, order: orderCol, rank: orderCol },
      "*"
    )
    return res[0] ?? ({} as TODO)
  } catch (error) {
    throw new CustomError("unable to insert", 502, {
      cause: error,
    })
  }
}
export async function deleteTodo(id: number) {
  try {
    let order = await db<TODO>("todo").first("*").where({ id })
    await db<TODO>("todo").where({ id }).del()
    await db<TODO>("todo")
      .where("order", ">=", order["order"])
      .decrement("order", 1)
    await db<TODO>("todo")
      .where("rank", ">=", order["rank"])
      .decrement("rank", 1)
    return order
  } catch (error) {
    throw new CustomError("unable to insert", 502, {
      cause: error,
    })
  }
}
