import { DomainError } from '../../../../errors'

export class EmailAlreadyExistsError extends DomainError {
  constructor(email: string) {
    super('EM001', 'Email already exists', { email })
  }
}
