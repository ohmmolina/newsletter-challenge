import type { RouteRecordRaw } from 'vue-router'
const routes: RouteRecordRaw[] = [
  {
    path: '',
    name: 'newsletters',
    meta: {
      title: 'Newsletters'
    },
    component: () => import('../views/NewslettersView.vue')
  }
]

export default routes
