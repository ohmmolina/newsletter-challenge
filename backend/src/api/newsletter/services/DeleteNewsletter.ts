import type { NewsletterRepository } from '../interfaces/NewsletterRepository'
import { ErrorNewsletterNotFound } from '../errors/ErrorNewsletterNotFound'

export class DeleteNewsletter {
  private _repository: NewsletterRepository

  constructor(repository: NewsletterRepository) {
    this._repository = repository
  }

  async run(id: string): Promise<boolean> {
    const newsletter = await this._repository.delete(id)
    if (!newsletter) throw new ErrorNewsletterNotFound(id)
    return newsletter
  }
}
