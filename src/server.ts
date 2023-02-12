import cluster from "node:cluster"
import http from "http"
import os from "node:os"
import app from "./app"

/* creating cluster */
if (cluster.isPrimary) {
  for (let i = 0; i < os.cpus().length; i++) {
    /* making child process */
    cluster.fork()
  }
  /* make new instance if server is crashed */
  cluster.on("exit", () => {
    cluster.fork()
  })
} else {
  const PORT = process.env.PORT || 5000
  const server = http.createServer(app)
  server.listen(PORT, () =>
    console.log(`server listen on ${PORT} and pid:${process.pid}`)
  )
}
