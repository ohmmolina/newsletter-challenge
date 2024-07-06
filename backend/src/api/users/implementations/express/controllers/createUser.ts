import type { Request, Response, NextFunction } from 'express'
import { CreateUser } from '../../../services/CreateUser'
import UserRepository from '../../../models/in-memory'

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body

    const user = await new CreateUser(UserRepository).run(email)
    res.status(201).json({ user })
  } catch (e) {
    next(e)
  }
}
