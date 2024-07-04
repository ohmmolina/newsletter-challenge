export class ErrorNotConnected extends SystemError {
  constructor() {
    super({
      code: 'MAI002',
      status: 500,
      message: 'Could not connect to the email server'
    })
    this.handle()
  }
}
