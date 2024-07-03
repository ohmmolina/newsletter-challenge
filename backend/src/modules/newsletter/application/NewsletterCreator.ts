import type { Newsletter } from '../domain/entities/Newsletter'
import type { NewsletterRepository } from '../domain/repositories/NewsletterRepository'
import { ExistsEmail } from '../domain/services/ExistsEmail'
import { EmailAlreadyExistsError } from '../domain/errors/EmailAlreadyExistsError'

export class NewsletterCreator {
  private readonly _newsletterRepository: NewsletterRepository
  private readonly _existsEmail: ExistsEmail

  constructor(newsletterRepository: NewsletterRepository) {
    this._newsletterRepository = newsletterRepository
    this._existsEmail = new ExistsEmail(newsletterRepository)
  }

  async run(body: Newsletter): Promise<Newsletter> {
    const existsEmail: boolean = await this._existsEmail.run(body.email)
    if (existsEmail) {
      throw new EmailAlreadyExistsError(body.email)
    }
    const newsletterCreated: Newsletter =
      await this._newsletterRepository.create(body)
    return newsletterCreated
  }
}
