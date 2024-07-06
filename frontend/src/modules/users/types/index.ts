export type User = {
  id: string
  email: string
  subscribed: boolean
  createdAt: Date
  updatedAt?: Date
  unsubscribedAt?: Date
}
