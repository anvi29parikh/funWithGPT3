const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('pages/home.vue'),
        meta: {
          title: 'Fun With AI'
        }
      }
    ]
  },
  {
    path: '/404',
    component: () => import('pages/NotFound.vue'),
    meta: {
      title: 'Not Found'
    }
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
