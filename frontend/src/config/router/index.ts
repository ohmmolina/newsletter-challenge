import { createRouter, createWebHistory } from 'vue-router'
import routers from './groups'
import { getGuards } from './guards'
const guards = getGuards()

// Routes
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [routers.main, ...routers.especific]
})

// Guards
Object.values(guards).forEach((guard) => {
  guard(router)
})

export default router
