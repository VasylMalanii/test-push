import axios, { isAxiosError } from 'axios';
import { refreshToken } from '@api/auth';
import { StackActions, useNavigation } from '@react-navigation/native';
import { useContext, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import CredentialsStorage from '@utils/CredentialsStorage';

export default function AxiosProvider() {
  const { accessToken, setTokens, clearTokens } = useContext(AuthContext);
  const navigation = useNavigation();

  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      async (config) => {
        if (accessToken) {
          config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (isAxiosError(error)) {
          if (error?.config?.url && error?.response?.status === 401) {
            try {
              const data = await CredentialsStorage.getAsync();
              if (!data?.refreshToken) {
                throw new Error('No refresh token found');
              }
              const result = await refreshToken({ refreshToken: data.refreshToken });
              await setTokens(result.data);
              return await axios(error.config);
            } catch (_error) {
              clearTokens();
              navigation.dispatch(StackActions.popToTop());
              return Promise.reject(_error);
            }
          }
        }
        return Promise.reject(error);
      },
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [accessToken]);

  return null;
}
