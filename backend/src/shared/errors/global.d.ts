declare global {
  type ErrorStructure = {
    id: string
    code: string
    timestamp: string
    details?: Record<string, unknown>
  }

  interface CustomError {
    name: string
    message: string
    getError(): ErrorStructure
    log?(): void
    handle(): void
  }

  class SystemError extends ERror implements CustomError {
    name: string
    message: string
    error: ErrorStructure = {} as ErrorStructure
    constructor(
      code: string,
      message: string,
      details?: Record<string, unknown>
    )
    handle(): void
  }
}

export {}
