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
const router = Router()
/* route fro getting todo , inserting and deleting todo */
router
  .route("/")
  .get(getTodo)
  .post(bodyValidator(body), add)
  .delete(bodyValidator(id), deleteTodoController)

//route ro get progressive todo
router.get("/progress", getProgressingController)

//route ro get testing todo
router.get("/testing", getTestingController)

//route ro get done todo
router.get("/done", getDoneController)

// route for moving to another todo card
router.put("/todo/move", bodyValidator(id), moveToTodo)
router.put("/progress/move", bodyValidator(id), moveTOProgress)
router.put("/testing/move", bodyValidator(id), moveToTest)
router.put("/done/move", bodyValidator(id), moveToDone)

// route for moving to same card
router.get("/move", bodyValidator(idAndOrder), moveOnSame)

export default router
