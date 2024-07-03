import app from './src'
import validateEnvs from './src/shared/utils/validateEnvs'

// Stop the server if any required env is missing
validateEnvs()

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
