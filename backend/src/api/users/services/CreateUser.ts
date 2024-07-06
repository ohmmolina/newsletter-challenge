import type { User } from '../interfaces/UserEntity'
import type { UserRepository } from '../interfaces/UserRepository'
import { UserExistsByEmail } from './UserExistsByEmail'
import {
  ErrorUserAlreadyExists,
  ErrorEmailRequired,
  ErrorEmailInvalid
} from '../errors'
import { v4 as uuidv4 } from 'uuid'

export class CreateUser {
  private _repository: UserRepository
  private _userExistsByEmail: UserExistsByEmail

  constructor(UserRepository: UserRepository) {
    this._repository = UserRepository
    this._userExistsByEmail = new UserExistsByEmail(UserRepository)
  }
  validateEmail(email: string): void {
    if (!email) {
      throw new ErrorEmailRequired(email)
    }
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!regex.test(email)) {
      throw new ErrorEmailInvalid(email)
    }
  }
  create(email: string): User {
    return {
      id: uuidv4(),
      email,
      createdAt: new Date(),
      subscribed: true
    }
  }
  async run(email: string): Promise<User> {
    this.validateEmail(email)
    const userExists: boolean = await this._userExistsByEmail.run(email)
    if (userExists) {
      throw new ErrorUserAlreadyExists(email)
    }
    const userData = this.create(email)
    const userCreated = this._repository.create(userData)
    return userCreated
  }
}
