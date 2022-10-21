import AsyncStorage from "@react-native-async-storage/async-storage"

const KEY_BOADRDING_PASS = 'boarding-pass'
export function saveBoarding(data: string) {
  AsyncStorage.setItem(KEY_BOADRDING_PASS, data);
}
export async function getBoarding() {
  return await AsyncStorage.getItem(KEY_BOADRDING_PASS);
}