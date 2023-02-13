declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number
      DB_HOST: string
      DB_USER: string
      DB_PASSWORD: string
      DB_DATABASE: string
      DB_PORT: number
      SECRET: string
      ADMIN_USERNAME: string
      ADMIN_PASSWORD: string
    }
  }
}
export {}
