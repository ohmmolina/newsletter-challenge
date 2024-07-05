import type { App } from 'vue'
import 'primeicons/primeicons.css'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'
import Tooltip from 'primevue/tooltip'
import Ripple from 'primevue/ripple'
import { registerComponents } from './components'

export default {
  usePrimeVue: (app: App) => {
    app.use(PrimeVue, {
      theme: {
        preset: Aura
      }
    })
    app.use(ToastService)
    app.use(ConfirmationService)
    app.directive('tooltip', Tooltip)
    app.directive('ripple', Ripple)
    registerComponents(app)
  }
}
