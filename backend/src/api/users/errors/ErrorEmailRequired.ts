export class ErrorEmailRequired extends DomainError {
  constructor(email: string) {
    super({
      code: 'USR002',
      status: 400,
      message: 'Email is required',
      details: { email }
    })
    this.handle()
  }
}
