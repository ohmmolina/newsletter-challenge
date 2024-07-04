import { Router } from 'express'
import type { Request, Response, NextFunction } from 'express'
import {
  readNewsletter,
  createNewsletter,
  sendNewsletter
} from '../controllers'

const router = Router()

router.get('/', readNewsletter)
router.get('/:id/send', sendNewsletter)
router.post('/', createNewsletter)

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
      code: 'SYS_NWL',
      error: 'Internal Server Error',
      details: {}
    })
  }
  next()
})

export default router
