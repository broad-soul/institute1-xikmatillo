export function mobileDetect () {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)
}
export function iosDetect () {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent)
}
export function iPadDetect () {
  return /iPad|iPod/i.test(navigator.userAgent)
}
export function iphoneDetect () {
  return /iPhone/i.test(navigator.userAgent)
}
export function getLangPr (state) {
  return state.langPr
}
