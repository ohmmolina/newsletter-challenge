export interface Newsletter {
  id: string
  title: string
  files: string[]
  sendedTimes: number
  createdAt: Date
  updatedAt?: Date
  lastSentAt?: Date
}
