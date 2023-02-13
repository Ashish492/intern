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
import { customRouteFunction } from '../utils/asyncErrorHandler';
const body = todo.pick({ body: true })
const id = todo.pick({ id: true })
const idAndOrder = todo.pick({ id: true, order: true }).required()
export const todoRouter = Router()
/* route fro getting todo , inserting and deleting todo */
todoRouter
  .route("/")
  .get(getTodo)
  .post(customRouteFunction(bodyValidator(body)), customRouteFunction(add))
  .delete(bodyValidator(id),customRouteFunction( deleteTodoController))
//route ro get progressive todo
todoRouter.get("/progress",customRouteFunction( getProgressingController))
//route ro get testing todo
todoRouter.get("/testing",customRouteFunction( getTestingController))
//route ro get done todo
todoRouter.get("/done",customRouteFunction( getDoneController))
// route for moving to another todo card
todoRouter.put("/todo/move", customRouteFunction(bodyValidator(id)),customRouteFunction( moveToTodo))
todoRouter.put("/progress/move",customRouteFunction( bodyValidator(id)),customRouteFunction( moveTOProgress))
todoRouter.put("/testing/move", customRouteFunction(bodyValidator(id)),customRouteFunction( moveToTest))
todoRouter.put("/done/move",customRouteFunction(bodyValidator(id)), customRouteFunction(moveToDone))
// route for moving to same card
todoRouter.get("/move",customRouteFunction(bodyValidator(idAndOrder)),customRouteFunction( moveOnSame))
