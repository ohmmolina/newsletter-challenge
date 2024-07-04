export class ErrorUserNotFound extends DomainError {
  constructor(id: string) {
    super({
      code: 'USR404',
      status: 404,
      message: 'User not found',
      details: { id }
    })
    this.handle()
  }
}
