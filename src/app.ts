import express, {
  Application,
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express"
import dotenv from "dotenv"
import createHttpError from "http-errors"
import { adminRoute, todoRouter } from "./routes"
import helmet from "helmet"
import cors from "cors"
import { z } from "zod"
import { auth, initializePassport } from "./middleware"
import { checkOutRouter } from "./routes"
dotenv.config()
const app: Application = express()
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
//modifying header
app.use(helmet())
app.use(initializePassport())
app.use(cors())
app.get("/", (req, res) => {
  res.json("hi")
})
// making todo route
app.use("/todo", todoRouter)
// admin route
app.use("/admin", auth(), adminRoute)
//
app.use("/checkOut", checkOutRouter)
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new createHttpError.NotFound())
})
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log("hi")

  if (err instanceof z.ZodError) {
    res.status(400)
    console.log(err)
    res.json({ success: false, message: "data error", issue: err.issues })
  } else {
    res.status(err.status ?? 500)
    res.json({ success: false, message: err.message ?? "failed" })
  }
}
app.use(errorHandler)
export default app
