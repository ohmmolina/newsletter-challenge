import express from 'express'
import { Mailer } from './shared/helpers/mailers'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.json({ message: 'server is up and running' })
})
app.get('/hello', async (req, res) => {
  const mailer = new Mailer()
  const sended = await mailer.sendMail(
    'omar.molina.hernandez@gmail.com',
    'Newsletter',
    'welcome',
    { userName: 'Omar' }
  )
  res.json({ sended })
})

export default app
