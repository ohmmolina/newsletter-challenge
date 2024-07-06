export class ErrorNewsletterNotFound extends DomainError {
  constructor(id: string) {
    super({
      code: 'NWL404',
      status: 404,
      message: 'Newsletter not found',
      details: { id }
    })
    this.handle()
  }
}
