import type { ErrorStructure } from './types'
import type { CustomError } from './interfaces'

export abstract class DomainError implements CustomError {
  private error: ErrorStructure = {} as ErrorStructure

  constructor(
    code: string,
    message: string,
    details?: Record<string, unknown>
  ) {
    this.error.code = code
    this.error.message = message
    this.error.details = details
    this.generatedId()
  }

  private generatedId() {
    this.error.id = `D${new Date().getTime()}`
  }
  getError() {
    return this.error
  }
  log() {
    console.error(this.error)
  }
  handle() {
    this.log()
  }
}
