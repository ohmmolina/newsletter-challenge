import type { RouteRecordRaw } from 'vue-router'
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    meta: {
      title: 'Home'
    },
    component: () => import('../views/HomeView.vue')
  }
]

export default routes
