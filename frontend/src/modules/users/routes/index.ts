const routes = [
  {
    path: '/users',
    name: 'users',
    meta: {
      title: 'Users'
    },
    component: () => import('../views/UsersView.vue')
  }
]

export default routes
