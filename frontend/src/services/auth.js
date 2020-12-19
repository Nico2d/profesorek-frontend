export const isBrowser = () => typeof window !== "undefined"

export const setUser = user => {
  window.localStorage.setItem("user", JSON.stringify(user))
}

export const setToken = token => {
  window.localStorage.setItem("token", token)
}

export const getToken = () =>
  isBrowser && window.localStorage.getItem("token")
    ? window.localStorage.getItem("token")
    : null

export const getUser = () =>
  isBrowser && window.localStorage.getItem("user")
    ? JSON.parse(window.localStorage.getItem("user"))
    : {}

export const isSignIn = () => {
  return getToken() !== null
}

export const SignOut = () => {
  window.localStorage.removeItem("user")
  window.localStorage.removeItem("token")
  window.location.reload()
}
