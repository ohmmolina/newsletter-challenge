export class ErrorInvalidCredentials extends SystemError {
  constructor(details: { email: string; password: string }) {
    super({
      code: 'MAI001',
      status: 500,
      message: 'Invalid credentials',
      details
    })
    this.handle()
  }
}
