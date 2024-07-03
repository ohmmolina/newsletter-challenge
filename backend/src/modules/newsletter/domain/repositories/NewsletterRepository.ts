import type { Newsletter } from '../entities/Newsletter'

export interface NewsletterRepository {
  getAll(): Promise<Newsletter[]>
  getById(id: string): Promise<Newsletter | null>
  getByEmail(email: string): Promise<Newsletter | null>
  create(newsletter: Newsletter): Promise<Newsletter>
  update(newsletter: Newsletter): Promise<Newsletter>
}
