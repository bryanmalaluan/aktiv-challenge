import AsyncStorage from '@react-native-async-storage/async-storage';
import handleError from './handleError';

/** function for storing data in locatl storage */
export const storeData = async (key: string, data: any) => {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (ex) {
    handleError('Error storing data in local storage');
  }
};

/** function for getting data in local storage */
export const getData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (ex) {
    handleError('Error retrieving data from local storage');
  }
};
