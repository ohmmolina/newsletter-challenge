import type { User } from '../types'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { injectToast } from '@/helpers/toasts'
import services from '../ws/users'

export const useUsersStore = defineStore('users', () => {
  const Toasts = injectToast()

  const loading = ref(false)
  const getterLoading = computed(() => loading.value)
  const saving = ref(false)
  const getterSaving = computed(() => saving.value)
  const unsubscribing = ref(false)
  const getterUnsubscribing = computed(() => unsubscribing.value)
  const deleting = ref(false)
  const getterDeleting = computed(() => deleting.value)

  const users = ref<User[]>([])
  const getterUsers = computed(() => users.value)
  const selectedUser = ref<User>({
    id: '',
    email: '',
    subscribed: false,
    createdAt: new Date()
  })

  async function getAll() {
    try {
      loading.value = true
      const response = await services.getUsers()
      if (response.error) {
        throw new Error(response.error)
      }
      users.value = response.data
    } catch (error) {
      console.error(error)
      if (error instanceof Error) {
        console.log('toast')
        Toasts.errorToast({
          summary: 'An error occurred while fetching users',
          detail: error.message
        })
      }
    } finally {
      loading.value = false
    }
  }
  async function add() {
    try {
      saving.value = true
      if (!selectedUser.value.email) {
        Toasts.errorToast({
          summary: 'Email is required'
        })
        return
      }
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!regex.test(selectedUser.value.email)) {
        Toasts.errorToast({
          summary: 'Invalid email'
        })
        return
      }
      const response = await services.addUser(selectedUser.value)
      if (response.error) {
        throw new Error(response.error)
      }
      users.value.push(response.data)
      Toasts.successToast({
        summary: 'User added successfully'
      })
    } catch (error) {
      console.error(error)
      if (error instanceof Error) {
        Toasts.errorToast({
          summary: 'An error occurred while adding the user',
          detail: error.message
        })
      }
    } finally {
      saving.value = false
    }
  }
  function select(id: string) {
    const finded = users.value.find((u) => u.id === id)
    if (!finded) {
      Toasts.errorToast({
        summary: 'User not found'
      })
      return
    }
    selectedUser.value = finded
  }
  async function unsubscribe(id: string) {
    try {
      unsubscribing.value = true
      const response = await services.unsubscribeUser(id)
      if (response.error) {
        throw new Error(response.error)
      }
      const user = users.value.find((u) => u.id === id)
      if (!user) {
        throw new Error('User not found')
      }
      user.subscribed = false
      user.unsubscribedAt = response.data.unsubscribedAt
      Toasts.successToast({
        summary: 'User unsubscribed successfully'
      })
    } catch (error) {
      console.error(error)
      if (error instanceof Error) {
        Toasts.errorToast({
          summary: 'An error occurred while unsubscribing the user',
          detail: error.message
        })
      }
    } finally {
      unsubscribing.value = false
    }
  }
  async function del(id: string) {
    try {
      deleting.value = true
      const response = await services.deleteUser(id)
      if (response.error) {
        throw new Error(response.error)
      }
      users.value = users.value.filter((n) => n.id !== id)
      Toasts.successToast({
        summary: 'User deleted successfully'
      })
    } catch (error) {
      console.error(error)
      if (error instanceof Error) {
        Toasts.errorToast({
          summary: 'An error occurred while deleting the user',
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
    unsubscribing: getterUnsubscribing,
    deleting: getterDeleting,
    users: getterUsers,
    selectedUser,
    getAll,
    add,
    select,
    unsubscribe,
    del
  }
})
