import React, { useState } from 'react';
import CredentialsStorage from '@utils/CredentialsStorage';
import { LoginResponse } from '@models/auth';

export interface AuthContextProps {
  isAuthorized: boolean;
  accessToken?: string;
  setTokens: (_: LoginResponse) => Promise<void>;
  clearTokens: () => void;
}

const AuthContext = React.createContext<AuthContextProps>({
  isAuthorized: false,
  setTokens: (_: LoginResponse) => Promise.resolve(),
  clearTokens: () => {},
});

type ComponentLayoutProviderProps = React.PropsWithChildren & {};

function AuthProvider({ children }: ComponentLayoutProviderProps) {
  const [accessToken, setAccessToken] = useState<string | undefined>(
    CredentialsStorage.get()?.accessToken,
  );

  const setTokens = async (data: LoginResponse) => {
    await CredentialsStorage.setAsync(data);
    setAccessToken(data.accessToken);
  };

  const clearTokens = async () => {
    await CredentialsStorage.deleteAsync();
    setAccessToken(undefined);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthorized: !!accessToken, accessToken, setTokens, clearTokens }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
