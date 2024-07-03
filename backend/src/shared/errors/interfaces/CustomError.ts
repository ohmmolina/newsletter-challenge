import type { ErrorStructure } from '../types'

export interface CustomError {
  getError(): ErrorStructure
  log?(): void
  handle(): void
}
