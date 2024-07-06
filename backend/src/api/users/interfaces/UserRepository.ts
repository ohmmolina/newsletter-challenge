import type { User } from './UserEntity'
export interface UserRepository {
  getAll(): Promise<User[]>
  find(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  create(body: User): Promise<User>
  update(body: User): Promise<User>
  delete(id: string): Promise<boolean>
}
