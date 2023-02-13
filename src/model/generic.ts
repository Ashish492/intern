import { TableName } from "../types"
import CustomError from "../Error/CustomError"
import db from "../utils/connection"
export async function insert<T>(row: T, tableName: TableName) {
  try {
    return await db(tableName).insert(row)
  } catch (error) {
    console.log(error)

    throw new CustomError("unable to add data", 500)
  }
}
