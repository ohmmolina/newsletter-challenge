declare global {
  type ErrorStructure = {
    id: string
    code: string
    status?: number
    timestamp: string
    details?: Record<string, unknown>
  }

  interface ICustomError {
    name: string
    message: string
    getError(): ErrorStructure
    log?(): void
    handle(): void
  }

  class SystemError extends Error implements ICustomError {
    name: string
    message: string
    error: ErrorStructure = {} as ErrorStructure
    constructor({
      code,
      status,
      message,
      details
    }: {
      code: string
      status: number
      message: string
      details?: Record<string, unknown>
    })
    handle(): void
    getError(): ErrorStructure
  }

  class DomainError extends Error implements ICustomError {
    name: string
    message: string
    error: ErrorStructure = {} as ErrorStructure
    constructor({
      code,
      status,
      message,
      details
    }: {
      code: string
      status: number
      message: string
      details?: Record<string, unknown>
    })
    handle(): void
    getError(): ErrorStructure
  }
}

export {}
