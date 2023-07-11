export const camelToSnake = str => str[0].toLowerCase() + str.slice(1, str.length).replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)

export const camelToSnakeObj = (obj) => {
  const newObj = {}
  for (const key in obj) {
    if (obj[key] && typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
      obj[key] = camelToSnakeObj(obj[key])
    } else if (obj[key] && Array.isArray(obj[key])) {
      obj[key] = camelToSnakeArr(obj[key])
    }
    newObj[camelToSnake(key)] = obj[key]
  }
  return newObj
}

export const camelToSnakeArr = (arr) => {
  return arr.map(arrItem => {
    if (arrItem && typeof arrItem === 'object') {
      return camelToSnakeObj(arrItem)
    } else if (arrItem && Array.isArray(arrItem)) {
      return camelToSnakeArr(arrItem)
    } else {
      return arrItem
    }
  })
}

const snakeToCamel = (str) => str.replace(
  /([-_][a-z])/g,
  (group) => group.toUpperCase().replace('-', '').replace('_', '')
)

export const snakeToCamelObj = (obj) => {
  const newObj:any = {}
  for (const key in obj) {
    if (obj[key] && typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
      obj[key] = snakeToCamelObj(obj[key])
    } else if (obj[key] && Array.isArray(obj[key])) {
      obj[key] = snakeToCamelArr(obj[key])
    }
    newObj[snakeToCamel(key)] = obj[key]
  }
  return newObj
}

export const snakeToCamelArr = (arr) => {
  return arr.map(arrItem => {
    if (arrItem && typeof arrItem === 'object') {
      return snakeToCamelObj(arrItem)
    } else if (arrItem && Array.isArray(arrItem)) {
      return snakeToCamelArr(arrItem)
    } else {
      return arrItem
    }
  })
}
