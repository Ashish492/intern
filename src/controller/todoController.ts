import { Request, Response } from "express"
import {
  deleteTodo,
  getDone,
  getProgressing,
  getTesting,
  getTodo as getTodoModel,
  insertTodo,
  move,
  updateRank,
} from "../model"
import { TODO, TYPES, customBodyRequest } from "../types"
import { CustomRouteFunction } from "../types/customExpress"
export async function getTodo(req: Request, res: Response) {
  const todo = await getTodoModel()
  res.json(todo)
}
export async function getProgressingController(req: Request, res: Response) {
  const todo = await getProgressing()
  res.json(todo)
}
export async function getTestingController(req: Request, res: Response) {
  const todo = await getTesting()
  res.json(todo)
}
export async function getDoneController(req: Request, res: Response) {
  const todo = await getDone()
  res.json(todo)
}
export const add: CustomRouteFunction<Pick<TODO, "body">> = async (
  req,
  res
) => {
  const { body } = req.body
  const resultTodo = await insertTodo({ body })
  res.json({ success: true, msg: "todo added" })
}
export async function moveOnSame(
  req: customBodyRequest<Pick<Required<TODO>, "id" | "rank">>,
  res: Response
) {
  const { id, rank } = req.body
  const todoResult = await updateRank(id, rank)
  res.json({ success: true, msg: "card rank updated" })
}
export async function moveToTodo(req: Request, res: Response) {
  const { id } = req.body
  const todoResult = await move(id, TYPES.TODO)
  res.json({ success: true, msg: " moved in todo successfully" })
}
export async function moveToTest(req: Request, res: Response) {
  const { id } = req.body
  const todo = await move(id, TYPES.TESTING)
  res.json({ success: true, msg: "todo moved to TEST" })
}
export async function moveTOProgress(req: Request, res: Response) {
  const { id } = req.body
  const todo = await move(id, TYPES.INPROGRESS)
  res.json({ success: true, msg: "todo moved to progress" })
}
export async function moveToDone(req: Request, res: Response) {
  const { id } = req.body
  const todo = await move(id, TYPES.DONE)
  res.json({ success: true, msg: "todo moved to Done" })
}
export async function deleteTodoController(req: Request, res: Response) {
  const { id } = req.body
  const todo = await deleteTodo(id)
  res.json({ success: true, msg: "data deleted" })
}
