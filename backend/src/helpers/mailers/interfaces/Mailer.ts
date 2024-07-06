type Attachments = {
  filename: string
  path: string
}
export interface Mailer {
  send(
    {
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
      attachments?: Attachments[]
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<{ accepted: any; rejected: any } | undefined>
}
