import { useState } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key)

      if (item === null) {
        return initialValue
      }

      return JSON.parse(item)
    } catch {
      return initialValue
    }
  })

  function setValue(value: T | ((prev: T) => T)) {
    setStoredValue((currentValue) => {
      const newValue =
        value instanceof Function ? value(currentValue) : value

      localStorage.setItem(key, JSON.stringify(newValue))

      return newValue
    })
  }

  return [storedValue, setValue] as const
}