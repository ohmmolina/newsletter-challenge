import type { Newsletter } from '../types'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import services from '../ws/newsletters'
import { injectToast } from '@/helpers/toasts'

export const useNewslettersStore = defineStore('newsletters', () => {
  const Toasts = injectToast()

  const loading = ref(false)
  const getterLoading = computed(() => loading.value)
  const saving = ref(false)
  const getterSaving = computed(() => saving.value)
  const sending = ref(false)
  const getterSending = computed(() => sending.value)
  const deleting = ref(false)
  const getterDeleting = computed(() => deleting.value)

  const newsletters = ref<Newsletter[]>([])
  const getterNewsletters = computed(() => newsletters.value)
  const selectedNewsletter = ref<Newsletter>({
    id: '',
    title: '',
    files: [],
    sendedTimes: 0,
    createdAt: new Date()
  })

  async function getAll() {
    try {
      loading.value = true
      const response = await services.getNewsletter()
      if (response.error) {
        throw new Error(response.error)
      }
      newsletters.value = response.data
    } catch (error) {
      console.error(error)
      if (error instanceof Error) {
        console.log('toast')
        Toasts.errorToast({
          summary: 'An error occurred while fetching newsletters',
          detail: error.message
        })
      }
    } finally {
      loading.value = false
    }
  }
  async function getFile(id: string, idFile: string) {
    try {
      const response = await services.getFile(id, idFile)
      if (response.error) {
        throw new Error(response.error)
      }
      if (response.data instanceof Blob) {
        return {
          url: URL.createObjectURL(response.data),
          type: response.data.type
        }
      }
      return response.data
    } catch (error) {
      console.error(error)
      if (error instanceof Error) {
        Toasts.errorToast({
          summary: 'An error occurred while fetching file',
          detail: error.message
        })
      }
    }
  }
  async function add() {
    try {
      saving.value = true
      if (!selectedNewsletter.value.title) {
        Toasts.errorToast({
          summary: 'Title is required'
        })
        return
      }
      const response = await services.addNewsletter(selectedNewsletter.value)
      if (response.error) {
        throw new Error(response.error)
      }
      newsletters.value.push(response.data)
      Toasts.successToast({
        summary: 'Newsletter added successfully'
      })
    } catch (error) {
      console.error(error)
      if (error instanceof Error) {
        Toasts.errorToast({
          summary: 'An error occurred while adding newsletter',
          detail: error.message
        })
      }
    } finally {
      saving.value = false
    }
  }
  function select(id: string) {
    const finded = newsletters.value.find((n) => n.id === id)
    if (!finded) {
      Toasts.errorToast({
        summary: 'Newsletter not found'
      })
      return
    }
    selectedNewsletter.value = finded
  }
  async function send(id: string) {
    try {
      sending.value = true
      const response = await services.sendNewsletter(id)
      if (response.error) {
        throw new Error(response.error)
      }
      const finded = newsletters.value.find((n) => n.id === id)
      if (!finded) {
        throw new Error('Newsletter not found')
      }
      finded.sendedTimes++
      Toasts.successToast({
        summary: 'Newsletter sent successfully'
      })
    } catch (error) {
      console.error(error)
      if (error instanceof Error) {
        Toasts.errorToast({
          summary: 'An error occurred while sending newsletter',
          detail: error.message
        })
      }
    } finally {
      sending.value = false
    }
  }
  async function del(id: string) {
    try {
      deleting.value = true
      const response = await services.deleteNewsletter(id)
      if (response.error) {
        throw new Error(response.error)
      }
      newsletters.value = newsletters.value.filter(
        (n) => n.id !== selectedNewsletter.value.id
      )
      Toasts.successToast({
        summary: 'Newsletter deleted successfully'
      })
    } catch (error) {
      console.error(error)
      if (error instanceof Error) {
        Toasts.errorToast({
          summary: 'An error occurred while deleting newsletter',
          detail: error.message
        })
      }
    } finally {
      deleting.value = false
    }
  }

  return {
    loading: getterLoading,
    saving: getterSaving,
    sending: getterSending,
    deleting: getterDeleting,
    newsletters: getterNewsletters,
    selectedNewsletter,
    getAll,
    getFile,
    add,
    select,
    send,
    del
  }
})
