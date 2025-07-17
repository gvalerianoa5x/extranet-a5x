import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

interface WarningsContextData {
  idAlert: number | null;
  error: string | null;
  isLoading: boolean;
  requestAlert: () => void;
}

const WarningsContext = createContext<WarningsContextData>({
  idAlert: null,
  error: null,
  isLoading: true,
  requestAlert: () => {},
});

export const WarningsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [idAlert, setIdAlert] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const requestAlert = useCallback(() => {
    console.log("tem alerta?")
    if (window.parent !== window) {
      window.parent.postMessage({ type: 'REQUEST_WEBHOOK_ALERT' }, 'https://a5x-dev.4biz.one');
    }
  }, []);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://a5x-dev.4biz.one') return;

      if (event.data?.type === 'WEBHOOK_ALERT') {
        if (event.data.idAlert) {
          setIdAlert(event.data.idAlert);
          console.log('Alerta da bolsa recebido: ' + event.data.idAlert);
        } else {
          setError('Alerta não encontrado na resposta');
        }
        setIsLoading(false);
      }
    };

    window.addEventListener('message', handleMessage);

    requestAlert(); // chamada inicial imediata

    const timeoutId = setTimeout(() => {
      if (isLoading) {
        setError('Timeout ao aguardar alerta da plataforma pai');
        setIsLoading(false);
      }
    }, 5000);

    const intervalId = setInterval(() => {
      if (document.visibilityState === 'visible') {
        requestAlert();
      }
    }, 10000);
    

    return () => {
      window.removeEventListener('message', handleMessage);
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [requestAlert, isLoading]);

  return (
    <WarningsContext.Provider value={{ idAlert, error, isLoading, requestAlert }}>
      {children}
    </WarningsContext.Provider>
  );
};

export const useWarnings = () => useContext(WarningsContext);
