import type { ErrorStructure } from '../types'

export interface ICustomError {
  name: string
  message: string
  getError(): ErrorStructure
  log?(): void
  handle(): void
}
