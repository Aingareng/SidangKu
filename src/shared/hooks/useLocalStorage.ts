import { useState } from "react";

export function useLocalStorage(key: string, initialValue: unknown) {
  // State untuk menyimpan data
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Cek apakah data sudah ada di localStorage
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error reading localStorage", error);
      return initialValue;
    }
  });

  // Function untuk memperbarui data di localStorage
  const setValue = (value: unknown) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error saving to localStorage", error);
    }
  };

  return [storedValue, setValue];
}
