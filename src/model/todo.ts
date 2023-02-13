import CustomError from "../Error/CustomError"
import { TODO, TYPES } from "../types"
import db from "../utils/connection"
async function get(type: TYPES = TYPES.TODO) {
  try {
    let todo = await db<TODO>("Todos")
      .select("*")
      .where("types", type)
      .orderBy("rank", "asc")

    return todo.map((t, key) => {
      delete t.types
      return { ...t, rank: key + 1 }
    })
  } catch (error) {
    throw new CustomError("unable to find err", 500, {
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
        "select rank from Todos where types=(select types from Todos where id=?)  order by rank",
        [id]
      )
    )[0][rank].rank
    if (typeof actualRank === undefined) {
      throw new CustomError("order must be a valid", 502)
    }
    let todo = await db<TODO>("Todos")
      .update({ rank: actualRank })
      .where("id", id)
    // await db.raw("set SQL_SAFE_UPDATES=0")
    // await db.raw("update  Todos set rank=rank+1 where order >=?", [actualRank])
    // await db.raw("set SQL_SAFE_UPDATES=1")
    await db<TODO>("Todos").increment("rank", 1).where("rank", ">=", actualRank)
    return todo
  } catch (error) {
    if (error instanceof CustomError) throw error
    throw new CustomError("unable to update", 500, {
      cause: error,
    })
  }
}
export async function move(id: number, types: TYPES) {
  try {
    let todo = await db<TODO>("Todos").update({ types }).where({ id })
    return todo
  } catch (error) {
    throw new CustomError("unable to move", 500, {
      cause: error,
    })
  }
}
export async function insertTodo(todo: Pick<TODO, "body">) {
  try {
    const orderCol1 = await db<TODO>("Todos")
      .select("order")
      .orderBy("order", "desc")
      .limit(1)
    console.log(orderCol1)
    const orderCol = (orderCol1[0]?.order ?? 0) + 1

    const res = await db<TODO>("Todos").insert({
      ...todo,
      order: orderCol,
      rank: orderCol,
    })
    return res[0] ?? ({} as TODO)
  } catch (error) {
    throw new CustomError("unable to insert", 500, {
      cause: error,
    })
  }
}
export async function deleteTodo(id: number) {
  try {
    let order = await db<TODO>("Todos").first("*").where({ id })
    await db<TODO>("todo").where({ id }).del()
    await db<TODO>("todo")
      .where("order", ">=", order["order"])
      .decrement("order", 1)
    await db<TODO>("todo")
      .where("rank", ">=", order["rank"])
      .decrement("rank", 1)
    return order
  } catch (error) {
    throw new CustomError("unable to insert", 500, {
      cause: error,
    })
  }
}
