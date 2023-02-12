import { Request, Response } from "express"
import { ADMIN, customBodyRequest } from "../types"
import jwt from "jsonwebtoken"
export async function login(req: customBodyRequest<ADMIN>, res: Response) {
  const { username, password } = req.body
  try {
    if (
      username === process.env.ADMIN_USERNAME &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = await jwt.sign(
        { username: process.env.ADMIN_USERNAME },
        process.env.SECRET
      )
      res.json({ success: true, token: `Bearer ${token}` })
    }
  } catch (error) {
    throw new CustomError("password or email incorrect", 401)
  }
}