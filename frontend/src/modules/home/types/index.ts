type NewsletterFile = {
  id: string
  file: string
}
export type Newsletter = {
  id: string
  title: string
  files: NewsletterFile[]
  sendedTimes: number
  createdAt: Date
  updatedAt?: Date
}
