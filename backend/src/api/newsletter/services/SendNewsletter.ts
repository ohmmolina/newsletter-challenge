import type { NewsletterRepository } from '../interfaces/NewsletterRepository'
import type { UserRepository } from '../../users/interfaces/UserRepository'
import type { Mailer } from '../../../helpers/mailers/interfaces/Mailer'
import { ErrorNewsletterNotFound, ErrorNoUsersRegistered } from '../errors'
import { v4 as uuidv4 } from 'uuid'

export class SendNewsletter {
  private _repository: NewsletterRepository
  private _userRepository: UserRepository
  private _mailer: Mailer

  constructor(
    NewsletterRepository: NewsletterRepository,
    UserRepository: UserRepository,
    Mailer: Mailer
  ) {
    this._repository = NewsletterRepository
    this._userRepository = UserRepository
    this._mailer = Mailer
  }

  async run(
    newsletterId: string
  ): Promise<{ accepted: string[]; rejected: string[] }> {
    const newsletter = await this._repository.find(newsletterId)
    if (!newsletter) throw new ErrorNewsletterNotFound(newsletterId)

    const users = await this._userRepository.getAll()
    if (!users) throw new ErrorNoUsersRegistered()
    if (!users.length) throw new ErrorNoUsersRegistered()
    const uuids = users.map(() => uuidv4())

    const emails: {
      accepted: string[]
      rejected: string[]
    } = {
      accepted: [],
      rejected: []
    }
    for await (const user of users) {
      const index = users.indexOf(user)
      const info = await this._mailer.send(
        [user.email],
        'Challenge Newsletter',
        'newsletter',
        {
          //TODO: replace localhost with .env domain variable
          unsubscribeURL: `http://localhost:5001/unsubscribe/?token=${uuids[index]}`
        }
      )
      if (info) {
        if (info.accepted.length) {
          emails.accepted.push(...info.accepted)
        }
        if (info.rejected.length) {
          emails.rejected.push(...info.rejected)
        }
      }
    }
    return emails
  }
}
