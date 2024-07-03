import type { NewsletterRepository } from '../repositories/NewsletterRepository'

export class UnsubscribedEmail {
  private readonly _newsletterRepository: NewsletterRepository

  constructor(newsletterRepository: NewsletterRepository) {
    this._newsletterRepository = newsletterRepository
  }

  async run(email: string): Promise<boolean> {
    const newsletter = await this._newsletterRepository.getByEmail(email)

    if (!newsletter) return false
    return !newsletter.subscribed
  }
}
