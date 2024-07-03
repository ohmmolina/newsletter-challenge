import { SystemError } from '../errors/SystemError'

class MissingEnvError extends SystemError {
  constructor(missingEnvs: string[]) {
    super('E001', 'Missing required environment variables', {
      missingEnvs
    })
  }
  handle(): void {
    this.log()
    process.exit(1)
  }
}

export default function validateEnvs() {
  const requiredEnvs = ['EMAIL_USER', 'EMAIL_PASS']

  const missingEnvs = requiredEnvs.filter((env) => !process.env[env])
  if (missingEnvs.length) {
    new MissingEnvError(missingEnvs.map((env) => `${env} is required`)).handle()
  }
}
