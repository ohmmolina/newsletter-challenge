import type { Router } from 'vue-router'
export default function (router: Router) {
  router.beforeEach((to, from, next) => {
    const title = to.meta.title as string
    if (title) {
      document.title = title
    }
    next()
  })
}
