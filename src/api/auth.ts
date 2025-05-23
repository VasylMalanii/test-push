import axios from 'axios';
import { LoginPayload, LoginResponse, RefreshTokenPayload } from '@models/auth';

export const login = async (data: LoginPayload) => {
  return await axios.post<LoginResponse>('https://dummyjson.com/auth/login', data);
};

export const refreshToken = async (data: RefreshTokenPayload) => {
  return await axios.post<LoginResponse>('https://dummyjson.com/auth/refresh', data);
};
