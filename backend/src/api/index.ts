import express from 'express'
import usersRoutes from './users/implementations/express/routes'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/users', usersRoutes)
app.get('/', (req, res) => {
  res.json({ message: 'server is up and running' })
})

export default app
