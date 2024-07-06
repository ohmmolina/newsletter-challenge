export class ErrorFileRequired extends DomainError {
  constructor() {
    super({ code: 'NWL003', status: 400, message: 'File is required' })
    this.handle()
  }
}
