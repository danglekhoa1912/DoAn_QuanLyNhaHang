import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveStorage = async (key, value) => {
   try {
      await AsyncStorage.setItem(key, value);
      return true;
   } catch (error) {
      return false;
   }
};

export const getStorage = async (key) => {
   try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
         return value;
      }
      return false;
   } catch (error) {
      return false;
   }
};

export const removeStorage = async (key) => {
   try {
      await AsyncStorage.removeItem(key);
      return true;
   } catch (error) {
      return false;
   }
};
