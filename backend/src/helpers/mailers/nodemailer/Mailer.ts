import nodemailer from 'nodemailer'
import hbs from 'nodemailer-express-handlebars'

import type { IMailer } from '../interfaces/IMailer'
import type { Options } from 'nodemailer/lib/mailer'
type ExtendedOptions = Options & {
  template: string
  context: Record<string, unknown>
}
type MailerError = {
  code: string
  name: string
}

export class Mailer implements IMailer {
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
      viewPath: 'src/assets/emails'
    }

    this.transporter.use('compile', hbs(hbsOpts))
  }

  handleMailerError(error: MailerError) {
    switch (error.code) {
      case 'EAUTH':
        new SystemError('ME001', 'Invalid email credentials', {
          email: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }).handle()
        break
      case 'ECONNECTION':
        new SystemError(
          'ME002',
          'Could not connect to the email server'
        ).handle()
        break
      case 'EENVELOPE':
        new SystemError('ME003', 'Invalid email envelope').handle()
        break
      default:
        new SystemError('ME999', 'An unhandled mailer error occurred').handle()
    }
  }

  async sendMail(
    to: string,
    subject: string,
    template: string,
    context: Record<string, unknown>
  ) {
    try {
      const mailOpts: ExtendedOptions = {
        from: this.from,
        to,
        subject,
        template,
        context
      }
      const info = await this.transporter.sendMail(mailOpts)
      return info
    } catch (error) {
      if ((error as MailerError).code) {
        this.handleMailerError(error as MailerError)
      } else if (error instanceof Error) {
        new SystemError('ME000', error.message).handle()
      } else {
        new SystemError('ME500', 'An unexpected error occurred').handle()
      }
    }
  }
}
