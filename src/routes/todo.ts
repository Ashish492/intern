import { Router } from "express"
import { bodyValidator } from "../middleware/validator"
import {
  add,
  deleteTodoController,
  getDoneController,
  getProgressingController,
  getTestingController,
  getTodo,
  moveOnSame,
  moveTOProgress,
  moveToDone,
  moveToTest,
  moveToTodo,
} from "../controller"
import { todo } from "../types"
const body = todo.pick({ body: true })
const id = todo.pick({ id: true })
const idAndOrder = todo.pick({ id: true, order: true }).required()
export const todoRouter = Router()
/* route fro getting todo , inserting and deleting todo */
todoRouter
  .route("/")
  .get(getTodo)
  .post(bodyValidator(body), add)
  .delete(bodyValidator(id), deleteTodoController)
//route ro get progressive todo
todoRouter.get("/progress", getProgressingController)
//route ro get testing todo
todoRouter.get("/testing", getTestingController)
//route ro get done todo
todoRouter.get("/done", getDoneController)
// route for moving to another todo card
todoRouter.put("/todo/move", bodyValidator(id), moveToTodo)
todoRouter.put("/progress/move", bodyValidator(id), moveTOProgress)
todoRouter.put("/testing/move", bodyValidator(id), moveToTest)
todoRouter.put("/done/move", bodyValidator(id), moveToDone)
// route for moving to same card
todoRouter.get("/move", bodyValidator(idAndOrder), moveOnSame)
