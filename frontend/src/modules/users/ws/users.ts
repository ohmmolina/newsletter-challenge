import type { FetchedData } from '@/utils/api'
import type { User } from '../types'
import api from '@/utils/api'

type UserAPI = {
  id: string
  email: string
  subscribed: boolean
  createdAt: string
  updatedAt?: string
  unsubscribedAt?: string
}

async function getUsers(): Promise<FetchedData> {
  try {
    const res = await api.get('/users')
    if (res.status !== 200) {
      return { error: res.data.error }
    }
    const users = res.data.users.map((nwl: UserAPI) => ({
      id: nwl.id,
      email: nwl.email,
      subscribed: nwl.subscribed,
      createdAt: new Date(nwl.createdAt),
      updatedAt: nwl.updatedAt ? new Date(nwl.updatedAt) : undefined,
      unsubscribedAt: nwl.unsubscribedAt
        ? new Date(nwl.unsubscribedAt)
        : undefined
    }))
    return {
      data: users
    }
  } catch (error) {
    console.error(error)
    return { error: 'An error occurred while fetching users' }
  }
}
async function addUser(user: User): Promise<FetchedData> {
  try {
    const res = await api.post('/users', user)
    if (res.status !== 201) {
      return { error: res.data.error }
    }
    console.log(res)
    const userCreated: User = {
      id: res.data.user.id,
      email: res.data.user.email,
      subscribed: res.data.user.subscribed,
      createdAt: new Date(res.data.user.createdAt),
      updatedAt: res.data.user.updatedAt
        ? new Date(res.data.user.updatedAt)
        : undefined,
      unsubscribedAt: res.data.user.unsubscribedAt
        ? new Date(res.data.user.unsubscribedAt)
        : undefined
    }
    return {
      data: userCreated
    }
  } catch (error) {
    console.error(error)
    return { error: 'An error occurred while adding user' }
  }
}
async function unsubscribeUser(id: string): Promise<FetchedData> {
  try {
    const res = await api.patch(`/users/${id}/unsubscribe`)
    if (res.status !== 200) {
      return { error: res.data.error }
    }
    return {
      data: res.data
    }
  } catch (error) {
    console.error(error)
    return { error: 'An error occurred while unsubscribing user' }
  }
}
async function deleteUser(id: string): Promise<FetchedData> {
  try {
    const res = await api.delete(`/users/${id}`)
    if (res.status !== 204) {
      return { error: res.data.error }
    }
    return {
      data: res.data
    }
  } catch (error) {
    console.error(error)
    return { error: 'An error occurred while deleting user' }
  }
}

export default {
  getUsers,
  addUser,
  unsubscribeUser,
  deleteUser
}
