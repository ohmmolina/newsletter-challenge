import type { UserRepository } from '../interfaces/UserRepository'
import { ErrorUserNotFound } from '../errors/ErrorUserNotFound'

export class DeleteUser {
  private _repository: UserRepository

  constructor(repository: UserRepository) {
    this._repository = repository
  }

  async run(id: string): Promise<boolean> {
    const user = await this._repository.delete(id)
    if (!user) throw new ErrorUserNotFound(id)
    return user
  }
}
