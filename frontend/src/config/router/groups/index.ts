/* eslint-disable @typescript-eslint/no-unused-vars */
import type { RouteRecordRaw } from 'vue-router'
import Layouts from '@/layouts'
import specificPaths from './specificPaths'

interface RouteModule {
  default: any
}

const routers: Record<string, RouteModule> = import.meta.glob('@/modules/**/routes/index.ts', {
  eager: true
})
const prependRoute = '/src/modules/'

function mainRoutes() {
  try {
    const children = Object.entries(routers)
      .filter(([p]) => p.startsWith(prependRoute) && !specificPaths.some((q) => p.includes(q)))
      .flatMap(([_, r]) => r.default)

    const main: RouteRecordRaw = {
      path: '/',
      name: 'main',
      children
    }

    main.component = Layouts.main

    return main
  } catch (e) {
    console.error(e)
    throw new Error('Principal routes not found')
  }
}

function specifcRoutes() {
  const routes: RouteRecordRaw[] = []

  specificPaths.forEach((route) => {
    try {
      const children = Object.entries(routers)
        .filter(([p]) => p.startsWith(prependRoute + route))
        .map(([_, r]) => r.default)

      if (children.length < 1) return

      const router: RouteRecordRaw = {
        path: '/' + route,
        name: route,
        children
      }

      if (Layouts[route as keyof typeof Layouts])
        router.component = Layouts[route as keyof typeof Layouts]
      routes.push(router)
    } catch (e) {
      console.error(e)
      throw new Error('Specific route not found ' + route)
    }
  })

  return routes
}

export default {
  main: mainRoutes(),
  especific: specifcRoutes()
}
