declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SECRET: string
      PORT: number
      DB_HOST: string
      DB_USER: string
      DB_PASSWORD: string
      DB_DATABASE: string
      DB_PORT: number
      SECRET: string
    }
  }
}
export {}
