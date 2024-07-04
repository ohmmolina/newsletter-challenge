import type { Request, Response, NextFunction } from 'express'
import { ReadNewsletter } from '../../../services/ReadNewsletter'
import NewsletterRepository from '../../../models/in-memory'

export const readNewsletter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newsletter = await new ReadNewsletter(NewsletterRepository).run()
    res.status(200).json({ newsletter })
  } catch (e) {
    next(e)
  }
}
