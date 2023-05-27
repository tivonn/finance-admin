import lodash from 'lodash'

export const isDev = (): boolean => {
  return process.env.NODE_ENV === 'development'
}

export const isCN = (): boolean => {
  const language = getLocalStorage('language')
  if (!lodash.isEmpty(language)) {
    return language === 'cn'
  } else {
    return true
  }
}

export const getLocalStorage = (key: string) => {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : null
  } catch (error) {
    return null
  }
}

export const setLocalStorage = (key: string, value: unknown) => {
  localStorage.setItem(key, JSON.stringify(value))
}
