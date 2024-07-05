import type { NewsletterRepository } from '../interfaces/NewsletterRepository'
import { ErrorNewsletterNotFound, ErrorFileNotFound } from '../errors'
import fs from 'fs'
import path from 'path'

export class ReadNewsletterFile {
  private _newsletterRepository: NewsletterRepository
  constructor(newsletterRepository: NewsletterRepository) {
    this._newsletterRepository = newsletterRepository
  }

  async run(id: string, fileId: string): Promise<string> {
    const newsletter = await this._newsletterRepository.find(id)
    if (!newsletter) {
      throw new ErrorNewsletterNotFound(id)
    }
    const file = newsletter.files.find((file) => file.id === fileId)
    if (!file) {
      throw new ErrorFileNotFound(fileId)
    }
    const filePath = path.join(process.cwd(), 'uploads/newsletter', file.file)
    const fileFound = fs.readFileSync(filePath)
    if (!fileFound) {
      throw new ErrorFileNotFound(fileId)
    }
    return filePath
  }
}
