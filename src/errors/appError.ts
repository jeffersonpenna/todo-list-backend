export default class AppError extends Error {
  public readonly message: string
  public readonly statusCode: number

  constructor(message: string, statusCode = 500) {
    super(message)
    this.message = message
    this.statusCode = statusCode
    this.printError(this.message, this.statusCode)
  }

  printError(message: string, code: number): void {
    const msg = message.replace(/"/g, ",")
    console.log(`{statusCode: ${code}, message: ${msg}}`)
  }
}