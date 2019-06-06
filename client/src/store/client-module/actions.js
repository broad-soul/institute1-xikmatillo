export function openUrl (context, val) {
  window.open(val)
}
export function changeLang (context, val) {
  localStorage.setItem('local_lang', val)
  context.commit('CHANGE_LANG', val)
}
