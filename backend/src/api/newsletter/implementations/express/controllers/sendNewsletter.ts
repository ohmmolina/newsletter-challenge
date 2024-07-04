import type { Request, Response, NextFunction } from 'express'
import { SendNewsletter } from '../../../services/SendNewsletter'
import NewsletterRepository from '../../../models/in-memory'
import UserRepository from '../../../../users/models/in-memory'
import Mailer from '../../../../../helpers/mailers/implementations/nodemailer'

export const sendNewsletter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params

    const info = await new SendNewsletter(
      NewsletterRepository,
      UserRepository,
      Mailer
    ).run(id)
    res.status(201).json({ info })
  } catch (e) {
    next(e)
  }
}
