import { LoginResponse } from '@models/auth';
import * as SecureStore from 'expo-secure-store';

export default class CredentialsStorage {
  static async setAsync(value: LoginResponse) {
    await SecureStore.setItemAsync('tokens', JSON.stringify(value));
  }
  static get() {
    const data = SecureStore.getItem('tokens');
    return data ? (JSON.parse(data) as LoginResponse) : null;
  }
  static async getAsync() {
    const data = await SecureStore.getItemAsync('tokens');
    return data ? (JSON.parse(data) as LoginResponse) : null;
  }
  static async deleteAsync() {
    await SecureStore.deleteItemAsync('tokens');
  }
}
