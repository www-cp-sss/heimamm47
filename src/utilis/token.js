const TOKEN = 'token'

export function getToken() {
    window.localStorage.getItem(TOKEN)
}
export function setToken(token) {
    return window.localStorage.setItem(TOKEN,token)
}
export function removeToken() {
    window.localStorage.removeItem(TOKEN)
}