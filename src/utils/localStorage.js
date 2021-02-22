// import Cookies from 'js-cookie'
import Setting from '../settings'

const TokenKey = Setting.accessTokenKey

export function getToken() {
  return localStorage.getItem(TokenKey)
}

export function setToken(token) {
  return localStorage.setItem(TokenKey, token)
}

export function removeToken() {
  return localStorage.removeItem(TokenKey)
}

export function setLocalStorageKey(key, value) {
  return localStorage.setItem(key, value)
}

export function getLocalStorageKey(key) {
  return localStorage.getItem(key)
}

export function removeLocalStorageKey(key) {
  return localStorage.removeItem(key)
}
