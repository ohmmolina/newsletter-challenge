export class ErrorUnexpected extends SystemError {
  constructor({
    code,
    message,
    details
  }: {
    code: string
    message?: string
    details?: Record<string, unknown>
  }) {
    super({
      code,
      status: 500,
      message: message || 'An unexpected error occurred',
      details
    })
    this.handle()
  }
}
