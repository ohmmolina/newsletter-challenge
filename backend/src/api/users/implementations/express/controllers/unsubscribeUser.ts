import type { Request, Response, NextFunction } from 'express'
import { UnsubscribeUser } from '../../../services/UnsubscribeUser'
import UserRepository from '../../../models/in-memory'

export const unsubscribeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params

    const user = await new UnsubscribeUser(UserRepository).run(id)
    res.status(200).send({ user })
  } catch (e) {
    next(e)
  }
}
