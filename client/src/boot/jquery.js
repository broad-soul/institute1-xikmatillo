import jQuery from 'jquery'
window.$ = jQuery

export default async ({ Vue }) => {
  Vue.prototype.$ = jQuery
}
