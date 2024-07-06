import type { NewsletterRepository } from '../interfaces/NewsletterRepository'
import { ErrorNewsletterNotFound, ErrorFileRequired } from '../errors'
import { v4 as uuidv4 } from 'uuid'

export class UploadFileToNewsletter {
  private _newsletterRepository: NewsletterRepository
  constructor(newsletterRepository: NewsletterRepository) {
    this._newsletterRepository = newsletterRepository
  }

  async run(id: string, file: Express.Multer.File | undefined) {
    const newsletter = await this._newsletterRepository.find(id)
    if (!newsletter) {
      throw new ErrorNewsletterNotFound(id)
    }
    if (!file) {
      throw new ErrorFileRequired()
    }
    if (newsletter.files.length) {
      newsletter.files = []
    }
    newsletter.files.push({ id: uuidv4(), file: file.filename })
    const updatedNewsletter =
      await this._newsletterRepository.update(newsletter)
    return updatedNewsletter
  }
}
