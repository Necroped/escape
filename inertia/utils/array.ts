type Key = string | number | symbol

export const uniqueByKey = <T extends Record<Key, any>>(array: T[], key: Key): T[] => {
  const seen = new Set<any>()
  return array.reverse().filter((item) => {
    const keyValue = item[key]
    if (seen.has(keyValue)) {
      return false
    } else {
      seen.add(keyValue)
      return true
    }
  })
}
