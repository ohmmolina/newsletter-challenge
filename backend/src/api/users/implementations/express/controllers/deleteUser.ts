import type { Request, Response, NextFunction } from 'express'
import { DeleteUser } from '../../../services/DeleteUser'
import UserRepository from '../../../models/in-memory'

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params

    await new DeleteUser(UserRepository).run(id)
    res.status(204).send()
  } catch (e) {
    next(e)
  }
}
