export interface Mailer {
  send(
    to: string[],
    subject: string,
    template: string,
    context: Record<string, unknown>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<{ accepted: any; rejected: any } | undefined>
}
