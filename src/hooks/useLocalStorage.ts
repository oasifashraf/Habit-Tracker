
import { useEffect, useState } from "react";

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  parse?: (json: string) => T
) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);

      if (item === null) {
        return initialValue;
      }

      return parse
        ? parse(item)
        : (JSON.parse(item) as T);
    } catch (error) {
      console.error("Error reading Local Storage:", error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(
        key,
        JSON.stringify(storedValue)
      );
    } catch (error) {
      console.error("Error saving Local Storage:", error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}
