export type ErrorStructure = {
  id: string
  name: string
  code: string
  timestamp: string
  message: string
  details?: Record<string, unknown>
}
