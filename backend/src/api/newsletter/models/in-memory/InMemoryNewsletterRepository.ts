import type { Newsletter } from '../../interfaces/NewsletterEntity'
import type { NewsletterRepository } from '../../interfaces/NewsletterRepository'

export class InMemoryNewsletterRepository implements NewsletterRepository {
  private _newsletters: Newsletter[] = []

  async getAll(): Promise<Newsletter[]> {
    return this._newsletters
  }

  async find(id: string): Promise<Newsletter | null> {
    return this._newsletters.find((newsletter) => newsletter.id === id) || null
  }

  async create(newsletter: Newsletter): Promise<Newsletter> {
    this._newsletters.push(newsletter)
    return this._newsletters[this._newsletters.length - 1]
  }

  async update(newsletter: Newsletter): Promise<Newsletter> {
    const newsletters = this._newsletters.filter((n) => n.id !== newsletter.id)
    newsletters.push(newsletter)
    this._newsletters = newsletters
    return newsletter
  }

  async delete(id: string): Promise<boolean> {
    const newsletter = this._newsletters.find((n) => n.id === id)
    if (!newsletter) return false
    this._newsletters = this._newsletters.filter((n) => n.id !== id)
    return true
  }
}
