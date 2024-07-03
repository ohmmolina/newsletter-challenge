import { Router } from 'express'

import {
  getAllNewslettersController,
  createNewsletterController,
  updateNewsletterController
} from '../controllers'

const route = Router()

route.get('/', getAllNewslettersController)
route.post('/', createNewsletterController)
route.put('/:id', updateNewsletterController)

export default route
