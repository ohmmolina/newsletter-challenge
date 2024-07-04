export class ErrorNoUsersRegistered extends DomainError {
  constructor() {
    super({
      code: 'NWL_USR404',
      status: 404,
      message: 'No users found',
      details: {}
    })
    this.handle()
  }
}
