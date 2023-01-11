function saveTokenAtCookie(value) {
  document.cookie = `token=${value}`
}

function deleteCookie(value) {
  document.cookie = `${value}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`
}

function getTokenFromCookie() {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
    '$1'
  )
}
export { saveTokenAtCookie, deleteCookie, getTokenFromCookie }
