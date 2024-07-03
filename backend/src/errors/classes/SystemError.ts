import type { ErrorStructure } from '../types'
import type { ICustomError } from '../interfaces'

export class SystemError extends Error implements ICustomError {
  name: string
  message: string
  private error: ErrorStructure = {} as ErrorStructure

  constructor(
    code: string,
    message: string,
    details?: Record<string, unknown>
  ) {
    super(message)
    this.name = this.constructor.name
    this.message = message
    this.error.code = code
    this.error.details = details
    this.generatedId()
    Object.setPrototypeOf(this, SystemError.prototype)
  }

  private generatedId() {
    this.error.id = `S${new Date().getTime()}`
  }
  getError() {
    return this.error
  }
  log() {
    console.error(this.stack)
    console.log('error: ', this.getError())
  }
  handle() {
    this.log()
  }
}

;(global as typeof global & { SystemError: typeof SystemError }).SystemError =
  SystemError
