import { config } from "dotenv"
import knex from "knex"
config()
const connectionConfig = {
  client: "mysql2",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: Number(process.env.DB_PORT),
  },
  pool: { min: 2, max: 10 },
}
const db = knex(connectionConfig)
export default db
