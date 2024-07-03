import type { NewsletterRepository } from '../repositories/NewsletterRepository'

export class ExistsEmail {
  private readonly _newsletterRepository: NewsletterRepository

  constructor(newsletterRepository: NewsletterRepository) {
    this._newsletterRepository = newsletterRepository
  }

  async run(email: string): Promise<boolean> {
    const newsletter = await this._newsletterRepository.getByEmail(email)

    return !!newsletter
  }
}
