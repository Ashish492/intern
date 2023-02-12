import { Router } from "express"
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

const router = Router()
/* route fro getting todo , inserting and deleting todo */
router.route("/").get(getTodo).post(add).delete(deleteTodoController)

//route ro get progressive todo
router.get("/progress", getProgressingController)

//route ro get testing todo
router.get("/testing", getTestingController)

//route ro get done todo
router.get("/done", getDoneController)

// route for moving to another todo card
router.get("/todo/move", moveToTodo)
router.get("/progress/move", moveTOProgress)
router.get("/testing/move", moveToTest)
router.get("/done/move", moveToDone)

// route for moving to same card
router.get("/move", moveOnSame)

export default router
