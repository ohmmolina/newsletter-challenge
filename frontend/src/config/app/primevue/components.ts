import type { App } from 'vue'
import { defineAsyncComponent } from 'vue'

const components = {
  Button: defineAsyncComponent(() => import('primevue/button')),
  IconField: defineAsyncComponent(() => import('primevue/iconfield')),
  InputIcon: defineAsyncComponent(() => import('primevue/inputicon')),
  InputText: defineAsyncComponent(() => import('primevue/inputtext')),
  InputNumber: defineAsyncComponent(() => import('primevue/inputnumber')),
  Dropdown: defineAsyncComponent(() => import('primevue/dropdown')),
  Checkbox: defineAsyncComponent(() => import('primevue/checkbox')),
  RadioButton: defineAsyncComponent(() => import('primevue/radiobutton')),
  InputSwitch: defineAsyncComponent(() => import('primevue/inputswitch')),
  FileUpload: defineAsyncComponent(() => import('primevue/fileupload')),
  InlineMessage: defineAsyncComponent(() => import('primevue/inlinemessage')),
  Tag: defineAsyncComponent(() => import('primevue/tag')),
  Badge: defineAsyncComponent(() => import('primevue/badge')),
  Dialog: defineAsyncComponent(() => import('primevue/dialog')),
  Toast: defineAsyncComponent(() => import('primevue/toast')),
  ProgressBar: defineAsyncComponent(() => import('primevue/progressbar'))
}

export function registerComponents(app: App) {
  for (const [name, module] of Object.entries(components)) {
    app.component(name, module)
  }
}
