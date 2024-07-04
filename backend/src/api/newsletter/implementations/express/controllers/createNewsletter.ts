import type { Request, Response, NextFunction } from 'express'
import { CreateNewsletter } from '../../../services/CreateNewsletter'
import NewsletterRepository from '../../../models/in-memory'

export const createNewsletter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title } = req.body

    const newsletter = await new CreateNewsletter(NewsletterRepository).run(
      title
    )
    res.status(201).json({ newsletter })
  } catch (e) {
    next(e)
  }
}
