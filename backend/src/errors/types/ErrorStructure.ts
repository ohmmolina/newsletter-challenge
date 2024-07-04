export type ErrorStructure = {
  id: string
  code: string
  status?: number
  timestamp: string
  details?: Record<string, unknown>
}
