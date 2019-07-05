export function CHANGE_LANG (state, val) {
  state.langPr = val
}
export function LOGIN (state, val) {
  state.token = val.token
}

export function SET_MAIN_DATA (state, val) {
  state.mainData = val
}
export function SET_INFO_USER (state, val) {
  state.user = val
}
