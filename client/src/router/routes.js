
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
      { path: '/events', component: () => import('pages/Events.vue') },
      { path: '/event/show/:id', component: () => import('pages/EventShow.vue') },
      { path: '/blog', component: () => import('pages/Blog.vue') },
      { path: '/blog/post/:id', component: () => import('pages/Post.vue') },
      { path: '/blog/category/:id', component: () => import('pages/CategoryPosts.vue') },
      { path: '/blog/tag/:id', component: () => import('pages/TagPosts.vue') },
      { path: '/faq', component: () => import('pages/Faq.vue') },
      { path: '/gallery', component: () => import('pages/Gallery.vue') },
      { path: '/partners', component: () => import('pages/Partners.vue') },
      { path: '/partners/show/:id', component: () => import('pages/PartnersShow.vue') },
      { path: '/extra-classes', component: () => import('pages/ExtraClasses.vue') },
      { path: '/extra-classes/show/:id', component: () => import('pages/ExtraClassesShow.vue') },
      { path: '/contests', component: () => import('pages/Contests.vue') },
      { path: '/contests/show/:id', component: () => import('pages/ContestsShow.vue') },
      { path: '/statistics', component: () => import('pages/Statistics.vue') },
      { path: '/statistics/show/:id', component: () => import('pages/StatisticsShow.vue') },
      { path: '/regulations', component: () => import('pages/Regulations.vue') },
      { path: '/regulations/show/:id', component: () => import('pages/RegulationsShow.vue') },
      { path: '/contacts', component: () => import('pages/Contacts.vue') },
      { path: '/email/confirmation/:token', component: () => import('pages/EmailVerify.vue') }
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
      { path: 'residents/instruction', component: () => import('pages/admin/InstructionResidents.vue') },
      { path: 'residents/show/:id', component: () => import('pages/admin/ShowResident.vue') },
      { path: 'non-residents', component: () => import('pages/admin/NonResidents.vue') },
      { path: 'non-residents/instruction', component: () => import('pages/admin/InstructionNonResidents.vue') },
      { path: 'non-residents/show/:id', component: () => import('pages/admin/ShowNonResident.vue') },
      { path: 'titles', component: () => import('pages/admin/Titles.vue') },
      { path: 'faq', component: () => import('pages/admin/Faq.vue') },
      { path: 'faq/create', component: () => import('pages/admin/FaqCreate.vue') },
      { path: 'faq/edit/:id', component: () => import('pages/admin/FaqEdit.vue') },
      { path: 'gallery', component: () => import('pages/admin/Gallery.vue') },
      { path: 'teachers', component: () => import('pages/admin/TeachersShow.vue') },
      { path: 'teachers/create', component: () => import('pages/admin/TeachersCreate.vue') },
      { path: 'teachers/edit/:id', component: () => import('pages/admin/TeachersEdit.vue') },
      { path: 'posts', component: () => import('pages/admin/Posts/Show.vue') },
      { path: 'posts/create', component: () => import('pages/admin/Posts/Create.vue') },
      { path: 'posts/edit/:id', component: () => import('pages/admin/Posts/Edit.vue') },
      { path: 'categories', component: () => import('pages/admin/Posts/Category/Show.vue') },
      { path: 'categories/create', component: () => import('pages/admin/Posts/Category/Create.vue') },
      { path: 'categories/edit/:id', component: () => import('pages/admin/Posts/Category/Edit.vue') },
      { path: 'tags', component: () => import('pages/admin/Posts/Tag/Show.vue') },
      { path: 'tags/create', component: () => import('pages/admin/Posts/Tag/Create.vue') },
      { path: 'tags/edit/:id', component: () => import('pages/admin/Posts/Tag/Edit.vue') },
      { path: 'partners', component: () => import('pages/admin/PartnersShow.vue') },
      { path: 'partners/create', component: () => import('pages/admin/PartnersCreate.vue') },
      { path: 'partners/edit/:id', component: () => import('pages/admin/PartnersEdit.vue') },
      { path: 'extra-classes', component: () => import('pages/admin/ExtraClassesShow.vue') },
      { path: 'extra-classes/create', component: () => import('pages/admin/ExtraClassesCreate.vue') },
      { path: 'extra-classes/edit/:id', component: () => import('pages/admin/ExtraClassesEdit.vue') },
      { path: 'contests', component: () => import('pages/admin/ContestsShow.vue') },
      { path: 'contests/create', component: () => import('pages/admin/ContestsCreate.vue') },
      { path: 'contests/edit/:id', component: () => import('pages/admin/ContestsEdit.vue') },
      { path: 'statistics', component: () => import('pages/admin/StatisticsShow.vue') },
      { path: 'statistics/create', component: () => import('pages/admin/StatisticsCreate.vue') },
      { path: 'statistics/edit/:id', component: () => import('pages/admin/StatisticsEdit.vue') },
      { path: 'regulations', component: () => import('pages/admin/RegulationsShow.vue') },
      { path: 'regulations/create', component: () => import('pages/admin/RegulationsCreate.vue') },
      { path: 'regulations/edit/:id', component: () => import('pages/admin/RegulationsEdit.vue') },
      { path: 'contacts', component: () => import('pages/admin/Contacts.vue') },
      { path: 'settings', component: () => import('pages/admin/Settings.vue') }
    ]
  },
  { path: '/login', component: () => import('pages/Login.vue') },
  { path: '/password/reset', component: () => import('pages/PasswordResetEmail.vue') },
  { path: '/password/reset/:token', component: () => import('pages/PasswordReset.vue') }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
