import type { Newsletter } from '../interfaces/NewsletterEntity'
import type { NewsletterRepository } from '../interfaces/NewsletterRepository'

export class ReadNewsletter {
  private _repository: NewsletterRepository

  constructor(NewsletterRepository: NewsletterRepository) {
    this._repository = NewsletterRepository
  }

  async run(): Promise<Newsletter[]> {
    const newsletters = await this._repository.getAll()
    return newsletters
  }
}
