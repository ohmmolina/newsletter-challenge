import type { Request, Response, NextFunction } from 'express'
import { ReadNewsletter } from '../../../services/ReadNewsletter'
import NewsletterRepository from '../../../models/in-memory'

export const readNewsletter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newsletters = await new ReadNewsletter(NewsletterRepository).run()
    res.status(200).json({ newsletters })
  } catch (e) {
    next(e)
  }
}
