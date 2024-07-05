import type { RouteRecordRaw } from 'vue-router'
const routes: RouteRecordRaw[] = [
  {
    path: '',
    name: 'home',
    meta: {
      title: 'Newsletter'
    },
    component: () => import('../views/HomeView.vue')
  }
]

export default routes
