import { TODO, TYPES } from "../types"
import db from "../utils/connection"
async function get(type: TYPES = TYPES.TODO) {
  try {
    let todo = await db<TODO>("todo")
      .select("*")
      .where("types", type)
      .orderBy("order", "asc")
    return todo.map((t, key) => ({ ...t, order: key }))
  } catch (error) {
    throw new DatabaseQueryError("unable to find err", 502, {
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
export async function updateOrder(id: number, order: number) {
  try {
    let todo = await db<TODO>("todo").update({ order }, "*").where({ id })
    await db.raw("set SQL_SAFE_UPDATES=0")
    await db.raw("update to set order=order+1 where order >=?", [order])
    await db.raw("set SQL_SAFE_UPDATES=1")
    return todo
  } catch (error) {
    throw new DatabaseQueryError("unable to insert", 502, {
      cause: error,
    })
  }
}
export async function move(id: number, types: TYPES) {
  try {
    let todo = await db<TODO>("todo").update({ types }, "*").where({ id })
    return todo
  } catch (error) {
    throw new DatabaseQueryError("unable to insert", 502, {
      cause: error,
    })
  }
}
export async function insertTodo(todo: TODO) {
  try {
    const res = await db<TODO>("todo").insert({ ...todo }, "*")
    return res[0] ?? ({} as TODO)
  } catch (error) {
    throw new DatabaseQueryError("unable to insert", 502, {
      cause: error,
    })
  }
}
export async function deleteTodo(id: number) {
  try {
    let order = await db<TODO>("todo").first("*").where({ id })
    await db<TODO>("todo").where({ id }).del()
    await db<TODO>("todo")
      .where("id", "<=", order["order"])
      .increment("order", 1)
    return order
  } catch (error) {
    throw new DatabaseQueryError("unable to insert", 502, {
      cause: error,
    })
  }
}
