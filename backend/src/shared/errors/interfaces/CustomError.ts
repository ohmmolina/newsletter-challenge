import type { ErrorStructure } from '../types'

export interface CustomError {
  name: string
  message: string
  getError(): ErrorStructure
  log?(): void
  handle(): void
}
