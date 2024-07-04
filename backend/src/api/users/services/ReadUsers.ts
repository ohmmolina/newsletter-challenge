import type { User } from '../interfaces/UserEntity'
import type { UserRepository } from '../interfaces/UserRepository'

export class ReadUser {
  private _repository: UserRepository

  constructor(UserRepository: UserRepository) {
    this._repository = UserRepository
  }
  async run(): Promise<User[]> {
    const users = await this._repository.getAll()
    return users
  }
}
