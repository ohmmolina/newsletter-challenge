export class ErrorTitleRequired extends DomainError {
  constructor() {
    super({ code: 'NWL001', status: 400, message: 'Title is required' })
  }
}
