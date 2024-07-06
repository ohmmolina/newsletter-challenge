import '@/assets/css/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from '../router'
import PrimeVue from './primevue'

const app = createApp(App)

app.use(createPinia())
app.use(router)

PrimeVue.usePrimeVue(app)

app.directive('remove-special', {
  mounted(el) {
    el.addEventListener('input', () => {
      if (el.tagName !== 'INPUT' && el.tagName !== 'TEXTAREA') return
      const sourceValue = el.value
      const start = el.selectionStart
      const end = el.selectionEnd
      let newValue =
        sourceValue.substring(0, start) +
        sourceValue.substring(start, end) +
        sourceValue.substring(end)
      newValue = newValue.replace(/[,.&()']+/g, '')
      if (sourceValue !== newValue) {
        el.value = newValue
        el.dispatchEvent(new Event('input', { bubbles: false }))
        // Restore the cursor position
        el.setSelectionRange(start, end)
      }
    })
  }
})
app.directive('numeric', {
  mounted(el) {
    el.addEventListener('input', () => {
      if (el.tagName !== 'INPUT' && el.tagName !== 'TEXTAREA') return
      const sourceValue = el.value
      const start = el.selectionStart
      const end = el.selectionEnd
      const newValue = sourceValue.replace(/[^0-9]/g, '')
      if (sourceValue !== newValue) {
        el.value = newValue
        el.dispatchEvent(new Event('input', { bubbles: false }))
        el.setSelectionRange(start, end)
      }
    })
  }
})
app.directive('alphanumeric', {
  mounted(el) {
    el.addEventListener('input', () => {
      if (el.tagName !== 'INPUT' && el.tagName !== 'TEXTAREA') return
      const sourceValue = el.value
      const start = el.selectionStart
      const end = el.selectionEnd
      const newValue = sourceValue.replaceAll(/[^A-Za-zÀ-ȕ0-9 ]+/gi, '')
      if (sourceValue !== newValue) {
        el.value = newValue
        el.dispatchEvent(new Event('input', { bubbles: false }))
        el.setSelectionRange(start, end)
      }
    })
  }
})
app.directive('select-on-focus', {
  mounted(el) {
    const input: HTMLInputElement = el.tagName === 'INPUT' ? el : el.children[0]
    input.addEventListener('focus', (e) => {
      if (!e.target) return
      const el = e.target as HTMLInputElement
      el.select()
    })
  }
})

app.mount('#app')
