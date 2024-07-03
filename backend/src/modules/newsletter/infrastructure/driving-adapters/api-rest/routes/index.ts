import { EmailAlreadyExistsError } from '../../../../domain/errors/EmailAlreadyExistsError'
import { EmailNotFoundError } from '../../../../domain/errors/EmailNotFoundError'
import type { Request, Response } from 'express'
import { Router } from 'express'
import newsletterRoutes from './newsletter.routes'

const route = Router()

route.use('/newsletter', newsletterRoutes)

route.use((err: Error, req: Request, res: Response) => {
  if (err instanceof EmailAlreadyExistsError) {
    return res.status(400).json({ message: err.message })
  }
  if (err instanceof EmailNotFoundError) {
    return res.status(400).json({ message: err.message })
  }
  return res.status(500).json({ message: 'Internal server error' })
})
