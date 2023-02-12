import express, {
  Application,
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express"
import dotenv from "dotenv"
import createHttpError from "http-errors"
import { todoRouter } from "./routes"
import helmet from "helmet"
import cors from "cors"
import { z } from "zod"

const app: Application = express()
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//modifying header
app.use(helmet())
app.use(cors())
dotenv.config()
app.get("/", (req, res) => {
  res.json("hi")
})

// making todo route
app.use("/todo", todoRouter)
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new createHttpError.NotFound())
})
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof z.ZodError) {
    res.status(502)
    res.json({ success: false, message: err.message, issue: err.issues })
  }
  res.status(err.status)
  res.json({ success: false, message: err.message })
}
app.use(errorHandler)
export default app
