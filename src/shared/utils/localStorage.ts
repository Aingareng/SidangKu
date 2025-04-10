type StorageValue<T> = T | null;

const localStorageUtils = {
  /**
   * Set item to localStorage
   * @param key - Key to store
   * @param value - Value to store
   */
  set<T>(key: string, value: T): void {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error(`Error setting localStorage item: ${key}`, error);
    }
  },

  /**
   * Get item from localStorage
   * @param key - Key to retrieve
   * @returns Parsed value or null
   */
  get<T>(key: string): StorageValue<T> {
    try {
      const value = localStorage.getItem(key);
      return value ? (JSON.parse(value) as T) : null;
    } catch (error) {
      console.error(`Error parsing localStorage item: ${key}`, error);
      return null;
    }
  },

  /**
   * Remove item from localStorage
   * @param key - Key to remove
   */
  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing localStorage item: ${key}`, error);
    }
  },

  /**
   * Clear all items from localStorage
   */
  clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error("Error clearing localStorage", error);
    }
  },

  /**
   * Check if a key exists in localStorage
   * @param key - Key to check
   * @returns Boolean
   */
  has(key: string): boolean {
    return localStorage.getItem(key) !== null;
  },
};

export default localStorageUtils;
