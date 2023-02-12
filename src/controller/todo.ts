import { Request, Response } from "express"
import {
  getDone,
  getProgressing,
  getTesting,
  getTodo as getTodoModel,
} from "../model"
import { deleteTodo, insertTodo, move, updateOrder } from "../model/todo"
import { TODO, TYPES, customBodyRequest, todo } from "../types/todo"
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
export async function add(
  req: customBodyRequest<Pick<TODO, "body">>,
  res: Response
) {
  const { body } = req.body
  await todo.pick({ body: true }).parseAsync(body)
  const resultTodo = await insertTodo({ body })
  res.json(resultTodo)
}
export async function moveOnSame(
  req: customBodyRequest<Pick<Required<TODO>, "id" | "order">>,
  res: Response
) {
  const { id, order } = req.body
  const todoResult = await updateOrder(id, order)
  res.json(todoResult)
}
export async function moveToTodo(req: Request, res: Response) {
  const { id } = req.body
  const todoResult = await move(id, TYPES.TODO)
  res.json(todoResult)
}
export async function moveToTest(req: Request, res: Response) {
  const { id } = req.body
  const todo = await move(id, TYPES.TESTING)
  res.json(todo)
}
export async function moveTOProgress(req: Request, res: Response) {
  const { id } = req.body
  const todo = await move(id, TYPES.INPROGRESS)
  res.json(todo)
}
export async function moveToDone(req: Request, res: Response) {
  const { id } = req.body
  const todo = await move(id, TYPES.DONE)
  res.json(todo)
}
export async function deleteTodoController(req: Request, res: Response) {
  const { id } = req.body
  const todo = await deleteTodo(id)
  res.json(todo)
}
