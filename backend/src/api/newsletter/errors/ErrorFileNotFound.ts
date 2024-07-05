export class ErrorFileNotFound extends DomainError {
  constructor(id: string) {
    super({
      code: 'NWL004',
      status: 400,
      message: 'File not found',
      details: { id }
    })
  }
}
