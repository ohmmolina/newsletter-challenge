import type { User } from '../interfaces/UserEntity'
import type { UserRepository } from '../interfaces/UserRepository'
import { ErrorUserNotFound } from '../errors/ErrorUserNotFound'

export class UnsubscribeUser {
  private _repository: UserRepository

  constructor(UserRepository: UserRepository) {
    this._repository = UserRepository
  }
  async run(id: string): Promise<User> {
    const user = await this._repository.find(id)
    if (!user) {
      throw new ErrorUserNotFound(id)
    }
    const data: User = {
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
      subscribed: false,
      unsubscribedAt: new Date()
    }
    const unsubscribedUser = await this._repository.update(data)
    return unsubscribedUser
  }
}
