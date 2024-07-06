import type { User } from '../../interfaces/UserEntity'
import type { UserRepository } from '../../interfaces/UserRepository'

export class InMemoryUserRepository implements UserRepository {
  private _users: User[] = []

  async getAll(): Promise<User[]> {
    return this._users
  }

  async find(id: string): Promise<User | null> {
    return this._users.find((user) => user.id === id) || null
  }

  async findByEmail(email: string): Promise<User | null> {
    return this._users.find((user) => user.email === email) || null
  }

  async create(user: User): Promise<User> {
    this._users.push(user)
    return this._users[this._users.length - 1]
  }

  async update(user: User): Promise<User> {
    const users = this._users.filter((u) => u.id !== user.id)
    users.push(user)
    this._users = users
    return user
  }

  async delete(id: string): Promise<boolean> {
    const user = this._users.find((u) => u.id === id)
    if (!user) return false
    this._users = this._users.filter((u) => u.id !== id)
    return true
  }
}
