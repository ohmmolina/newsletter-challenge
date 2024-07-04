export class ErrorInvalidTitle extends DomainError {
  constructor(title: unknown) {
    super({
      code: 'NWL002',
      status: 400,
      message: 'Title is invalid',
      details: { title }
    })
  }
}
