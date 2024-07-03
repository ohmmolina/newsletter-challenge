import type { Newsletter } from '../entities/Newsletter'
import type { NewsletterRepository } from '../repositories/NewsletterRepository'
import { EmailNotFoundError } from '../errors/EmailNotFoundError'

export class NewsletterGetterById {
  private readonly _newsletterRepository: NewsletterRepository

  constructor(newsletterRepository: NewsletterRepository) {
    this._newsletterRepository = newsletterRepository
  }

  async run(id: string): Promise<Newsletter> {
    const newsletter = await this._newsletterRepository.getById(id)
    if (!newsletter) throw new EmailNotFoundError(id)
    return newsletter
  }
}
