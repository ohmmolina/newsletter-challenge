export default function validateEnvs() {
  const requiredEnvs = ['EMAIL_USER', 'EMAIL_PASS']

  const missingEnvs = requiredEnvs.filter((env) => !process.env[env])
  if (missingEnvs.length) {
    new SystemError('E001', 'Missing required environment variables', {
      missingEnvs
    }).handle()
    process.exit(1)
  }
}
