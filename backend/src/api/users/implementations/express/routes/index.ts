import type { Request, Response, NextFunction } from 'express'
import { DomainError } from '../../../../../errors'
import { SystemError } from '../../../../../errors'
import { Router } from 'express'
import {
  readUser,
  createUser,
  deleteUser,
  unsubscribeUser
} from '../controllers'

const router = Router()

router.get('/', readUser)
router.post('/', createUser)
router.patch('/:id', unsubscribeUser)
router.delete('/:id', deleteUser)

router.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof DomainError || err instanceof SystemError) {
    const error = err.getError()
    res.status(error.status ?? 500).json({
      code: error.code,
      error: err.message,
      details: error.details
    })
    return
  } else if (err instanceof Error) {
    console.error(err.stack)
    res.status(500).json({
      code: 'SYS_USR',
      error: 'Internal Server Error',
      details: {}
    })
  }
  next()
})

export default router
