import type { Mailer } from '../../interfaces/Mailer'
import type { Options } from 'nodemailer/lib/mailer'
import nodemailer from 'nodemailer'
import hbs from 'nodemailer-express-handlebars'
import {
  ErrorInvalidCredentials,
  ErrorInvalidEnvelope,
  ErrorNotConnected,
  ErrorUnexpected
} from './errors'

type ExtendedOptions = Options & {
  template: string
  context: Record<string, unknown>
}
type MailerError = {
  code: string
  name: string
}

export class MailerNodeMailer implements Mailer {
  private transporter: nodemailer.Transporter
  private from: string

  public constructor() {
    this.from = process.env.EMAIL_USER as string
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    })

    const hbsOpts: hbs.NodemailerExpressHandlebarsOptions = {
      viewEngine: {
        defaultLayout: false
      },
      //TODO: replace with relative path
      viewPath: 'src/helpers/mailers/implementations/nodemailer/templates'
    }

    this.transporter.use('compile', hbs(hbsOpts))
  }

  handleMailerError(error: MailerError) {
    switch (error.code) {
      case 'EAUTH':
        throw new ErrorInvalidCredentials({
          email: process.env.EMAIL_USER as string,
          password: process.env.EMAIL_PASS as string
        })
        break
      case 'ECONNECTION':
        throw new ErrorNotConnected()
        break
      case 'EENVELOPE':
        throw new ErrorInvalidEnvelope()
        break
      default:
        throw new ErrorUnexpected({
          code: 'MAI999',
          message: 'An unhandled mailer error occurred',
          details: { error: error.code }
        })
    }
  }

  async send({
    to,
    subject,
    template,
    context,
    attachments
  }: {
    to: string[]
    subject: string
    template: string
    context: Record<string, unknown>
    attachments?: { filename: string; path: string }[]
  }) {
    try {
      const mailOpts: ExtendedOptions = {
        from: this.from,
        to,
        subject,
        template,
        context,
        attachments
      }
      const info = await this.transporter.sendMail(mailOpts)
      return { accepted: info.accepted, rejected: info.rejected }
    } catch (error) {
      if ((error as MailerError).code) {
        this.handleMailerError(error as MailerError)
      } else if (error instanceof Error) {
        throw new ErrorUnexpected({
          code: 'MAI000',
          message: error.message
        })
      } else {
        throw new ErrorUnexpected({
          code: 'MAI500'
        })
      }
    }
  }
}
