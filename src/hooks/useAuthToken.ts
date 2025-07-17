import { useState, useEffect, useCallback } from 'react';
import { setAuthToken, getAuthToken } from '../utils/authTokenManager';

interface MessageData {
  type: string;
  token?: string;
  idAlert?: number;
}

interface AuthTokenHook {
  token: string | null;
  isLoading: boolean;
  error: string | null;
  requestToken: () => void;
  requestAlert: () => void;
}

export const useAuthToken = (): AuthTokenHook => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const requestToken = useCallback(() => {
    if (window.parent !== window) {
      window.parent.postMessage({
        type: 'REQUEST_TOKEN'
      }, 'https://a5x-dev.4biz.one');
    }
  }, []);

  const requestAlert = useCallback(() => {
    if (window.parent !== window) {
      window.parent.postMessage({
        type: 'REQUEST_WEBHOOK_ALERT'
      }, 'https://a5x-dev.4biz.one');
    }
  }, []);

  useEffect(() => {
    const handleMessage = (event: MessageEvent<MessageData>) => {

      if (event.origin !== 'https://a5x-dev.4biz.one') {
        return;
      }

      if (event.data.type === 'AUTH_TOKEN') {
        if (event.data.token) {
          setToken(event.data.token);
          setAuthToken(event.data.token);
          setError(null);
          console.log('Token recebido da plataforma pai');
        } else {
          setError('Token não encontrado na resposta');
        }
        setIsLoading(false);
      }

      if (event.data.type === 'WEBHOOK_ALERT') {
        if (event.data.idAlert) {
          console.log('Alerta da bolsa recebido' + event.data.idAlert);
        } else {
          setError('Alerta não encontrado na resposta');
        }
        setIsLoading(false);
      }
    };


    window.addEventListener('message', handleMessage);


    if (window.parent !== window) {
      console.log('Aplicação rodando dentro de iframe');
      requestToken();
      requestAlert();
      const timeoutId = setTimeout(() => {
        if (isLoading) {
          setError('Timeout ao aguardar token da plataforma pai');
          setIsLoading(false);
        }
      }, 5000); // 5 sec

      return () => {
        window.removeEventListener('message', handleMessage);
        clearTimeout(timeoutId);
      };
    } else {
      console.log('Aplicação rodando fora do iframe');
      const localToken = getAuthToken();
      if (localToken) {
        setToken(localToken);
        console.log('Token carregado do localStorage');
      } else {
        setError('Token não encontrado no localStorage');
      }
      setIsLoading(false);
    }

    return () => window.removeEventListener('message', handleMessage);
  }, [requestToken, isLoading, requestAlert]);

  return { token, isLoading, error, requestToken, requestAlert };
};