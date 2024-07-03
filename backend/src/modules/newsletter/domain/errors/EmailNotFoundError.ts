import { DomainError } from '../../../../errors'

export class EmailNotFoundError extends DomainError {
  constructor(emailID: string) {
    super('EM002', 'Email not found', { emailID })
  }
}
