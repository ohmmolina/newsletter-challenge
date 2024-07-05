import type { Request, Response, NextFunction } from 'express'
import path from 'path'
import { Router } from 'express'
import multer from 'multer'
import {
  readNewsletter,
  readNewsletterFile,
  createNewsletter,
  uploadFileToNewsletter,
  sendNewsletter,
  deleteNewsletter
} from '../controllers'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/newsletter')
  },
  filename: (req, file, cb) => {
    cb(null, 'newsletter-' + Date.now() + path.extname(file.originalname))
  }
})
const upload = multer({
  storage,
  limits: {
    fileSize: 5000000 // 5MB
  }
})

const router = Router()

router.get('/', readNewsletter)
router.get('/:id/files/:idFile', readNewsletterFile)
router.get('/:id/send', sendNewsletter)
router.post('/', createNewsletter)
router.post('/:id/file', upload.single('file'), uploadFileToNewsletter)
router.delete('/:id', deleteNewsletter)

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
