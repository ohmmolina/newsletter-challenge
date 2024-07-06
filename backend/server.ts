// Import error handlers
import './src/errors'
// Import the app
import app from './src/api'
// Import the env validator
import validateEnvs from './src/utils/validateEnvs'

// Stop the server if any required env is missing
validateEnvs()

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
