export default function validateEnvs() {
  const requiredEnvs = ['EMAIL_USER', 'EMAIL_PASS']
  const missingEnvs = requiredEnvs.filter((env) => !process.env[env])
  if (missingEnvs.length) {
    throw new Error(`Missing required envs: ${missingEnvs.join(', ')}`)
  }
}
