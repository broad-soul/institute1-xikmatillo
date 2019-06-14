
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/resident', component: () => import('pages/Resident.vue') },
      { path: '/non-resident', component: () => import('pages/NonResident.vue') },
      { path: '/faq', component: () => import('pages/Faq.vue') }
    ]
  },
  {
    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'),
    meta: { needsAuthorization: true },
    children: [
      { path: '', component: () => import('pages/admin/Index.vue') },
      { path: 'main', component: () => import('pages/admin/MainPage.vue') },
      { path: 'residents', component: () => import('pages/admin/Residents.vue') },
      { path: 'residents/show/:id', component: () => import('pages/admin/ShowResident.vue') },
      { path: 'non-residents', component: () => import('pages/admin/NonResidents.vue') },
      { path: 'non-residents/show/:id', component: () => import('pages/admin/ShowNonResident.vue') },
      { path: 'titles', component: () => import('pages/admin/Titles.vue') }
    ]
  },
  {
    path: '/login',
    component: () => import('pages/Login.vue')
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
