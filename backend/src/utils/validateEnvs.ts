export default function validateEnvs() {
  const requiredEnvs = ['EMAIL_USER', 'EMAIL_PASS']

  const missingEnvs = requiredEnvs.filter((env) => !process.env[env])
  if (missingEnvs.length) {
    new SystemError({
      code: 'E001',
      status: 500,
      message: 'Missing required environment variables',
      details: {
        missingEnvs
      }
    }).handle()
    process.exit(1)
  }
}
