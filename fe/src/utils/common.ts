import lodash from 'lodash'

export const timeout = 500

export const isDev = (): boolean => {
  return process.env.NODE_ENV === 'development'
}

export const isCN = (): boolean => {
  const language = getLocalStorage('language')
  if (!lodash.isNull(language)) {
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

export const downloadFile = (data: any, fileName: string) => {
  const url = window.URL.createObjectURL(new Blob([data]))
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', fileName)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}



// 保留两位小数，返回 str 类型
export const keepTwoDecimalStr = (num: number | string): string => {
  if (lodash.isNull(num)) return '-'
  // 正负数判断
  let isPositiveNumber = true
  if (Number(num) < 0) {
    isPositiveNumber = false
  }
  const _num = isPositiveNumber ? Number(num) : Math.abs(Number(num))

  const result = Number(_num.toString().match(/^\d+(?:\.\d{0,2})?/));
  let s = result.toString();
  let rs = s.indexOf('.');
  if (rs < 0) {
    rs = s.length;
    s += '.';
  }
  while (s.length <= rs + 2) {
    s += '0';
  }
  return s === '0.00' ? '0' : `${isPositiveNumber ? '' : '-'}${s}`;
}

// 保留三位小数，返回 str 类型
export const keepThreeDecimalStr = (num: number | string | null): string => {
  if (lodash.isNull(num)) return '-'
  // 正负数判断
  let isPositiveNumber = true
  if (Number(num) < 0) {
    isPositiveNumber = false
  }
  const _num = isPositiveNumber ? Number(num) : Math.abs(Number(num))

  const result = Number(_num.toString().match(/^\d+(?:\.\d{0,3})?/));
  let s = result.toString();
  let rs = s.indexOf('.');
  if (rs < 0) {
    rs = s.length;
    s += '.';
  }
  while (s.length <= rs + 3) {
    s += '0';
  }
  return s === '0.000' ? '0' : `${isPositiveNumber ? '' : '-'}${s}`;
}