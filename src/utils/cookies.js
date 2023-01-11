function saveTokenAtCookie(value) {
  document.cookie = `token=${value}`
}

function deleteCookie(value) {
  document.cookie = `${value}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`
}
export { saveTokenAtCookie, deleteCookie }
