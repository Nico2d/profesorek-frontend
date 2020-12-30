export const setUser = user => {
  if (typeof window !== `undefined`) {
    window.localStorage.setItem("user", JSON.stringify(user))
  }
}

export const setToken = token => {
  if (typeof window !== `undefined`) {
    window.localStorage.setItem("token", token)
  }
}

export const getToken = () => {
  if (typeof window !== `undefined`) {
    return window.localStorage.getItem("token")
      ? window.localStorage.getItem("token")
      : null
  }
}

export const getUser = () => {
  if (typeof window !== `undefined`) {
    return window.localStorage.getItem("user")
      ? JSON.parse(window.localStorage.getItem("user"))
      : {}
  }
}

export const isSignIn = () => {
  return getToken() !== null
}

export const SignOut = () => {
  if (typeof window !== `undefined`) {
    window.localStorage.removeItem("user")
    window.localStorage.removeItem("token")
    window.location.reload()
  }
}
