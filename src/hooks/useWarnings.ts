import { useState, useEffect, useCallback } from 'react';

interface MessageData {
  type: string;
  idAlert?: number;
}

interface WarningsHookProps {
  idAlert: number | null;
  isLoading: boolean;
  error: string | null;

  requestAlert: () => void;
}

export const useWarnings = (): WarningsHookProps => {
  const [idAlert, setIdAlert] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

      if (event.data.type === 'WEBHOOK_ALERT') {
        if (event.data.idAlert) {
          setIdAlert(event.data.idAlert)
          console.log('Alerta da bolsa recebido' + event.data.idAlert);
        } else {
          setError('Alerta não encontrado na resposta');
        }
        setIsLoading(false);
      }
    };


    window.addEventListener('message', handleMessage);

    if (window.parent !== window) {
      requestAlert();
      const timeoutId = setTimeout(() => {
        if (isLoading) {
          setError('Timeout ao aguardar alerta da plataforma pai');
          setIsLoading(false);
        }
      }, 5000); // 5 sec

      return () => {
        window.removeEventListener('message', handleMessage);
        clearTimeout(timeoutId);
      };
    }

    return () => window.removeEventListener('message', handleMessage);
  }, [isLoading, requestAlert]);

  return { isLoading, error, requestAlert, idAlert };
};