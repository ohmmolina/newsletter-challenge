import type { Newsletter } from '../domain/entities/Newsletter'
import type { NewsletterRepository } from '../domain/repositories/NewsletterRepository'

export class NewsletterGetter {
  private readonly _newsletterRepository: NewsletterRepository

  constructor(newsletterRepository: NewsletterRepository) {
    this._newsletterRepository = newsletterRepository
  }

  async run(): Promise<Newsletter[]> {
    return await this._newsletterRepository.getAll()
  }
}
