import type { Newsletter } from '../domain/entities/Newsletter'
import type { NewsletterRepository } from '../domain/repositories/NewsletterRepository'
import { NewsletterGetterById } from '../domain/services/NewsletterGetterById'

export class NewsletterUpdater {
  private readonly _newsletterRepository: NewsletterRepository
  private readonly _newsletterGetterById: NewsletterGetterById

  constructor(newsletterRepository: NewsletterRepository) {
    this._newsletterRepository = newsletterRepository
    this._newsletterGetterById = new NewsletterGetterById(newsletterRepository)
  }

  async run(body: Newsletter): Promise<Newsletter> {
    const newsletter = await this._newsletterGetterById.run(body.id)

    const data: Newsletter = {
      id: newsletter.id,
      name: body.name ?? newsletter.name,
      email: body.email ?? newsletter.email,
      createdAt: newsletter.createdAt,
      updatedAt: new Date(),
      subscribed: body.subscribed ?? newsletter.subscribed
    }

    const newsletterUpdated: Newsletter =
      await this._newsletterRepository.update(data)
    return newsletterUpdated
  }
}
