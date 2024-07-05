import type { FetchedData } from '@/utils/api'
import type { Newsletter } from '../types'
import api from '@/utils/api'

type NewsletterFileApi = {
  id: string
  file: string
}
type NewsletterApi = {
  id: string
  title: string
  files: NewsletterFileApi[]
  sendedTimes: number
  createdAt: string
  updatedAt?: string
}

async function getNewsletter(): Promise<FetchedData> {
  try {
    const res = await api.get('/newsletters')
    if (res.status !== 200) {
      return { error: res.data.error }
    }
    const newsletters = res.data.newsletters.map((nwl: NewsletterApi) => ({
      id: nwl.id,
      title: nwl.title,
      files: nwl.files,
      sendedTimes: nwl.sendedTimes,
      createdAt: new Date(nwl.createdAt),
      updatedAt: nwl.updatedAt ? new Date(nwl.updatedAt) : undefined
    }))
    return {
      data: newsletters
    }
  } catch (error) {
    console.error(error)
    return { error: 'An error occurred while fetching newsletters' }
  }
}
async function getFile(id: string, idFile: string) {
  try {
    const res = await api.get(`/newsletters/${id}/files/${idFile}`)
    if (res.status !== 200) {
      return { error: res.data.error }
    }
    console.log(res)
    return {
      data: res.data
    }
  } catch (error) {
    console.error(error)
    return { error: 'An error occurred while fetching file' }
  }
}
async function addNewsletter(newsletter: Newsletter): Promise<FetchedData> {
  try {
    const res = await api.post('/newsletters', newsletter)
    if (res.status !== 201) {
      return { error: res.data.error }
    }
    const newsletterCreated = {
      id: res.data.newsletter.id,
      title: res.data.newsletter.title,
      files: res.data.newsletter.files,
      sendedTimes: res.data.newsletter.sendedTimes,
      createdAt: new Date(res.data.newsletter.createdAt),
      updatedAt: res.data.newsletter.updatedAt
        ? new Date(res.data.newsletter.updatedAt)
        : undefined
    }
    return {
      data: newsletterCreated
    }
  } catch (error) {
    console.error(error)
    return { error: 'An error occurred while adding newsletter' }
  }
}
async function sendNewsletter(id: string) {
  try {
    const res = await api.get(`/newsletters/${id}/send`)
    if (res.status !== 200) {
      console.log(res)
      return { error: res.data.error }
    }
    return {
      data: id
    }
  } catch (error) {
    console.error(error)
    return { error: 'An error occurred while sending newsletter' }
  }
}
async function deleteNewsletter(id: string) {
  try {
    const res = await api.delete(`/newsletters/${id}`)
    if (res.status !== 204) {
      return { error: res.data.error }
    }
    return {
      data: id
    }
  } catch (error) {
    console.error(error)
    return { error: 'An error occurred while deleting newsletter' }
  }
}

export default {
  getNewsletter,
  getFile,
  addNewsletter,
  sendNewsletter,
  deleteNewsletter
}
