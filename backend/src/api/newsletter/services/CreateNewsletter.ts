import type { Newsletter } from '../interfaces/NewsletterEntity'
import type { NewsletterRepository } from '../interfaces/NewsletterRepository'
import { ErrorTitleRequired, ErrorInvalidTitle } from '../errors'
import { v4 as uuidv4 } from 'uuid'

export class CreateNewsletter {
  private _repository: NewsletterRepository

  constructor(NewsletterRepository: NewsletterRepository) {
    this._repository = NewsletterRepository
  }
  validateTitle(title: unknown): void {
    if (!title) {
      throw new ErrorTitleRequired()
    }
    if (typeof title !== 'string' && typeof title !== 'number') {
      throw new ErrorInvalidTitle(title)
    }
  }
  sanitizeTitle(title: string | number): string {
    let titleSanitized = ''
    if (typeof title !== 'string') {
      titleSanitized = title.toString().trim()
    } else {
      titleSanitized = title.trim()
    }
    return titleSanitized.replaceAll(/[^\w\s]/g, '')
  }
  create(title: string): Newsletter {
    return {
      id: uuidv4(),
      title,
      files: [],
      sendedTimes: 0,
      createdAt: new Date()
    }
  }
  async run(title: string): Promise<Newsletter> {
    this.validateTitle(title)
    const newsletterData = this.create(this.sanitizeTitle(title))
    const newsletterCreated = await this._repository.create(newsletterData)
    return newsletterCreated
  }
}
