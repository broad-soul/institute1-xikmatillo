
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/resident', component: () => import('pages/Resident.vue') },
      { path: '/non-resident', component: () => import('pages/NonResident.vue') },
      { path: '/about-us', component: () => import('pages/AboutUs.vue') },
      { path: '/teachers', component: () => import('pages/Teachers.vue') },
      { path: '/event', component: () => import('pages/Event.vue') },
      { path: '/blog', component: () => import('pages/Blog.vue') },
      { path: '/faq', component: () => import('pages/Faq.vue') },
      { path: '/gallery', component: () => import('pages/Gallery.vue') }
    ]
  },
  {
    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'),
    meta: { needsAuthorization: true },
    children: [
      { path: '', component: () => import('pages/admin/Index.vue') },
      { path: 'main', component: () => import('pages/admin/MainPage.vue') },
      { path: 'about-us', component: () => import('pages/admin/AboutUs.vue') },
      { path: 'event', component: () => import('pages/admin/EventShow.vue') },
      { path: 'event/create', component: () => import('pages/admin/EventCreate.vue') },
      { path: 'event/edit/:id', component: () => import('pages/admin/EventEdit.vue') },
      { path: 'residents', component: () => import('pages/admin/Residents.vue') },
      { path: 'residents/show/:id', component: () => import('pages/admin/ShowResident.vue') },
      { path: 'non-residents', component: () => import('pages/admin/NonResidents.vue') },
      { path: 'non-residents/show/:id', component: () => import('pages/admin/ShowNonResident.vue') },
      { path: 'titles', component: () => import('pages/admin/Titles.vue') },
      { path: 'faq', component: () => import('pages/admin/Faq.vue') },
      { path: 'faq/create', component: () => import('pages/admin/FaqCreate.vue') },
      { path: 'faq/edit/:id', component: () => import('pages/admin/FaqEdit.vue') },
      { path: 'gallery', component: () => import('pages/admin/Gallery.vue') }
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
