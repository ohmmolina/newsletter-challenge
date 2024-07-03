import type { Newsletter } from '../../../domain/entities/Newsletter'
import type { NewsletterRepository } from '../../../domain/repositories/NewsletterRepository'
import newsletter_json from './newsletter.json'

export class InMemoryNewsletterRepository implements NewsletterRepository {
  private newsletters: Newsletter[]

  constructor() {
    this.newsletters = newsletter_json.map((nl) => ({
      ...nl,
      createdAt: new Date(nl.createdAt),
      updatedAt: new Date(nl.updatedAt)
    }))
  }

  async getAll(): Promise<Newsletter[]> {
    return this.newsletters
  }

  async getById(id: string): Promise<Newsletter | null> {
    const newsletter = this.newsletters.find(
      (newsletter) => newsletter.id === id
    )
    if (!newsletter) return null
    return newsletter
  }

  async getByEmail(email: string): Promise<Newsletter | null> {
    const newsletter = this.newsletters.find(
      (newsletter) => newsletter.email === email
    )
    if (!newsletter) return null
    return newsletter
  }

  async create(newsletter: Newsletter): Promise<Newsletter> {
    this.newsletters.push(newsletter)
    return newsletter
  }

  async update(newsletter: Newsletter): Promise<Newsletter> {
    const index = this.newsletters.findIndex((nl) => nl.id === newsletter.id)

    this.newsletters[index] = newsletter
    return newsletter
  }
}
