export class ErrorInvalidEnvelope extends SystemError {
  constructor() {
    super({
      code: 'MAI003',
      status: 500,
      message: 'Invalid envelope'
    })
    this.handle()
  }
}
