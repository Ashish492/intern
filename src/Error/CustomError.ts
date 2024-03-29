export default class CustomError extends Error {
  public status: number
  constructor(message: string, status: number, option?: ErrorOptions) {
    super(message, option)
    this.status = status
  }
}
