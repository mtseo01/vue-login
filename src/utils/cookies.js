function saveTokenAtCookie(value) {
  document.cookie = `token=${value}`
}

export { saveTokenAtCookie }
