export type APIErrorType = {
  message: string
  status: number
  path: Array<string>
}

export class APIError extends Error {
  status: number
  path: Array<String>
  constructor({ message, status, path }: APIErrorType) {
    super(message)
    this.message = message
    this.status = status
    this.path = path
  }
}
