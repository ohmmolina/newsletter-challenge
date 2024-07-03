export interface IMailer {
  sendMail(
    to: string,
    subject: string,
    template: string,
    context: Record<string, unknown>
  ): Promise<void>
}
