import { DomainError } from '../../../errors'

export class ErrorEmailInvalid extends DomainError {
  constructor(email: string) {
    super({
      code: 'USR003',
      status: 400,
      message: 'Email is invalid',
      details: { email }
    })
    this.handle()
  }
}
