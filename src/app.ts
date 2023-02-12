import express, {
  Application,
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express"
import dotenv from "dotenv"
import { Server } from "http"
import createHttpError from "http-errors"
import { todoRouter } from "./routes"
const app: Application = express()
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
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
  res.status(err.status)
  res.json({ success: false, message: err.message })
}
app.use(errorHandler)
export default app
