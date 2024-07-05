type NewsletterFile = {
  id: string
  file: string
}

export interface Newsletter {
  id: string
  title: string
  files: NewsletterFile[]
  sendedTimes: number
  createdAt: Date
  updatedAt?: Date
  lastSentAt?: Date
}
