import { DomainError } from '../../../errors'

export class ErrorUserAlreadyExists extends DomainError {
  constructor(email: string) {
    super({
      code: 'USR001',
      status: 400,
      message: 'User already exists',
      details: { email }
    })
    this.handle()
  }
}
