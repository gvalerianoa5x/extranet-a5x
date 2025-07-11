import React, { createContext, useContext, useEffect, type ReactNode } from 'react';
import { useAuthToken } from '../hooks/useAuthToken';
import { setGlobalAuthToken } from '../services/apis/apiBase';

interface AuthContextType {
  token: string | null;
  isLoading: boolean;
  error: string | null;
  requestToken: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { token, isLoading, error, requestToken } = useAuthToken();

  // Atualizar token global quando o hook receber novo token
  useEffect(() => {
    setGlobalAuthToken(token);
  }, [token]);

  // Listener para token expirado
  useEffect(() => {
    const handleTokenExpired = () => {
      console.log('Token expirado, solicitando novo token...');
      requestToken();
    };

    window.addEventListener('authTokenExpired', handleTokenExpired);
    return () => window.removeEventListener('authTokenExpired', handleTokenExpired);
  }, [requestToken]);

  return (
    <AuthContext.Provider value={{ token, isLoading, error, requestToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};