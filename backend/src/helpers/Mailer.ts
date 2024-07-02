import nodemailer from 'nodemailer'
import hbs from 'nodemailer-express-handlebars'
import type { Options } from 'nodemailer/lib/mailer'
type ExtendedOptions = Options & {
  template: string
  context: Record<string, unknown>
}

export default class Mailer {
  private transporter: nodemailer.Transporter
  private from: string

  public constructor() {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS)
      throw new Error('Email credentials not found')

    this.from = process.env.EMAIL_USER
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
      console.log(info)
      return info
    } catch (error) {
      console.error(error)
      return error
    }
  }
}
