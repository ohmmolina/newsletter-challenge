import type { Newsletter } from './NewsletterEntity'
export interface NewsletterRepository {
  getAll(): Promise<Newsletter[]>
  find(id: string): Promise<Newsletter | null>
  create(body: Newsletter): Promise<Newsletter>
  update(body: Newsletter): Promise<Newsletter>
  delete(id: string): Promise<boolean>
}
