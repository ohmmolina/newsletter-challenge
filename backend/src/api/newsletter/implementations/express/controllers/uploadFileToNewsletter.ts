import type { Request, Response, NextFunction } from 'express'
import { UploadFileToNewsletter } from '../../../services/UploadFileToNewsletter'
import NewsletterRepository from '../../../models/in-memory'

export const uploadFileToNewsletter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const { file } = req

    const newsletter = await new UploadFileToNewsletter(
      NewsletterRepository
    ).run(id, file)
    res.status(201).json({ newsletter })
  } catch (e) {
    next(e)
  }
}
