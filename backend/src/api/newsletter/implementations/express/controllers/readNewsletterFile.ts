import type { Request, Response, NextFunction } from 'express'
import { ReadNewsletterFile } from '../../../services/ReadNewsletterFile'
import NewsletterRepository from '../../../models/in-memory'

export const readNewsletterFile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, idFile } = req.params

    const newsletterFile = await new ReadNewsletterFile(
      NewsletterRepository
    ).run(id, idFile)
    res.status(200).sendFile(newsletterFile)
  } catch (e) {
    next(e)
  }
}
