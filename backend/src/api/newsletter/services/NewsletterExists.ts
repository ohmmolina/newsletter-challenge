import type { NewsletterRepository } from '../interfaces/NewsletterRepository'

export class NewsletterExists {
  private _repository: NewsletterRepository

  constructor(NewsletterRepository: NewsletterRepository) {
    this._repository = NewsletterRepository
  }
  async run(id: string): Promise<boolean> {
    const newsletterExists = await this._repository.find(id)
    return !!newsletterExists
  }
}
