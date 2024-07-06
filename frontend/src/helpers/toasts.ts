import { useToast } from 'primevue/usetoast'
// Use only in components or stores. Needs the vue scope.
export function injectToast() {
  const Toast = useToast()

  const successToast = ({
    summary,
    detail = undefined
  }: {
    summary: string
    detail?: string
  }) => {
    Toast.add({
      severity: 'success',
      summary,
      detail,
      life: 3000
    })
  }
  const errorToast = ({
    summary,
    detail = undefined,
    life = 3000,
    unauthorized = false
  }: {
    summary: string
    detail?: string
    life?: number
    unauthorized?: boolean
  }) => {
    if (localStorage.getItem('401') && !unauthorized) return
    Toast.add({ severity: 'error', summary, detail, life })
  }
  const warnToast = ({
    summary,
    detail = undefined,
    life = 3000
  }: {
    summary: string
    detail?: string
    life?: number
  }) => {
    Toast.add({ severity: 'warn', summary, detail, life })
  }

  return {
    successToast,
    errorToast,
    warnToast
  }
}
