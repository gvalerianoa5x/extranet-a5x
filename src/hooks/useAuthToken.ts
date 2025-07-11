import { useState, useEffect, useCallback } from 'react';

interface MessageData {
  type: string;
  token?: string;
}

interface AuthTokenHook {
  token: string | null;
  isLoading: boolean;
  error: string | null;
  requestToken: () => void;
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

  useEffect(() => {
    const handleMessage = (event: MessageEvent<MessageData>) => {

      if (event.origin !== 'https://a5x-dev.4biz.one') {
        return;
      }

      if (event.data.type === 'AUTH_TOKEN') {
        if (event.data.token) {
          setToken(event.data.token);
          setError(null);
          console.log('Token recebido da plataforma pai');
        } else {
          setError('Token não encontrado na resposta');
        }
        setIsLoading(false);
      }
    };


    window.addEventListener('message', handleMessage);


    if (window.parent !== window) {
      console.log('Aplicação rodando dentro de iframe');
      requestToken();
      
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
      const localToken = localStorage.getItem('HYPER-AUTH-TOKEN');
      if (localToken) {
        setToken(localToken);
        console.log('Token carregado do localStorage');
      } else {
        setError('Token não encontrado no localStorage');
      }
      setIsLoading(false);
    }

    return () => window.removeEventListener('message', handleMessage);
  }, [requestToken, isLoading]);

  return { token, isLoading, error, requestToken };
};