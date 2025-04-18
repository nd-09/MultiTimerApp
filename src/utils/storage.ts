import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Save any JSON-serializable data to AsyncStorage.
 * @param key string - unique key under which data will be stored
 * @param data any - data to store
 */
export const saveToStorage = async (key: string, data: any): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.error(`Error saving ${key} to storage:`, error);
  }
};

/**
 * Load and parse data from AsyncStorage by key.
 * @param key string - key to retrieve
 * @returns any | null
 */
export const loadFromStorage = async (key: string): Promise<any | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error(`Error loading ${key} from storage:`, error);
    return null;
  }
};

/**
 * Clear a specific key from AsyncStorage.
 * @param key string - key to remove
 */
export const removeFromStorage = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing ${key} from storage:`, error);
  }
};
