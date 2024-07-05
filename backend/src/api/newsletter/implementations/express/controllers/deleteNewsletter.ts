import type { Request, Response, NextFunction } from 'express'
import { DeleteNewsletter } from '../../../services/DeleteNewsletter'
import NewsletterRepository from '../../../models/in-memory'

export const deleteNewsletter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params

    await new DeleteNewsletter(NewsletterRepository).run(id)
    res.status(204).send()
  } catch (e) {
    next(e)
  }
}
