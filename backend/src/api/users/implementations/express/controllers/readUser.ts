import type { Request, Response, NextFunction } from 'express'
import { ReadUser } from '../../../services/ReadUsers'
import UserRepository from '../../../models/in-memory'

export const readUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await new ReadUser(UserRepository).run()
    res.status(200).json({ users })
  } catch (e) {
    next(e)
  }
}
