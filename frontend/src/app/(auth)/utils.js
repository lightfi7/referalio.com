import axios from 'axios'
let expiredTimer

export const jwtDecode = (token) => {
  if (token) {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join(''),
    )
    return JSON.parse(jsonPayload)
  }
}

export const tokenExpired = (exp, iat) => {
  const expTimeInMs = exp * 1000 // expiration time in milliseconds
  const iatTimeInMs = iat * 1000 // issued at time in milliseconds
  const timeLeft = expTimeInMs - iatTimeInMs
  clearTimeout(expiredTimer)
  expiredTimer = setTimeout(() => {
    alert('Token expired')
    localStorage.removeItem('accessToken')
    window.location.href = paths.auth.jwt.login
  }, timeLeft)
}

export const setSession = (accessToken, name) => {
  if (accessToken && name) {
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('currentUserName', name)
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
    const { exp, iat } = jwtDecode(accessToken)
    tokenExpired(exp, iat)
  } else {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('currentUserName')
    delete axios.defaults.headers.common.Authorization
  }
}
