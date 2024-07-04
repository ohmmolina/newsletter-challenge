import type { UserRepository } from '../interfaces/UserRepository'

export class UserExistsByEmail {
  private _repository: UserRepository

  constructor(UserRepository: UserRepository) {
    this._repository = UserRepository
  }
  async run(email: string): Promise<boolean> {
    const userExists = await this._repository.findByEmail(email)
    return !!userExists
  }
}
