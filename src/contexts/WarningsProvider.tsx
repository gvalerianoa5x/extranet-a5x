import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from 'react';
import { getAlertas, type AlertaItem } from '../services/alertasBolsaService';

interface WarningsContextData {
  idAlert: number | null;
  error: string | null;
  isLoading: boolean;
  alertas: AlertaItem[];
  requestAlert: () => void;
}

const WarningsContext = createContext<WarningsContextData>({
  idAlert: null,
  error: null,
  isLoading: true,
  alertas: [],
  requestAlert: () => {},
});

export const WarningsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [idAlert, setIdAlert] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [alertas, setAlertas] = useState<AlertaItem[]>([]);

  const lastFetchRef = useRef<number>(0);

  const fetchAlertFromApi = useCallback(async () => {
    const now = Date.now();
    if (now - lastFetchRef.current < 5000) {
      // Evita múltiplas execuções seguidas
      return;
    }
  
    lastFetchRef.current = now;
  
    try {
      setIsLoading(true);
      const alertas = await getAlertas();
  
      if (alertas.length > 0) {
        setAlertas(alertas);
        setIdAlert(alertas[0].id);
        setError(null);
        console.log('Alertas recebidos da API:', alertas);
      } else {
        setError('Nenhum alerta encontrado');
        setAlertas([]);
      }
    } catch (err) {
      console.error('Erro ao buscar alertas:', err);
      setError('Erro ao buscar alertas');
      setAlertas([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const requestAlert = useCallback(() => {
    if (window.parent !== window) {
      window.parent.postMessage(
        { type: 'REQUEST_WEBHOOK_ALERT' },
        'https://a5x-dev.4biz.one'
      );
    }
  }, []);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://extranet-a5x-dev.vercel.app/'){
        return;
      } 
      fetchAlertFromApi();
    };

    window.addEventListener('message', handleMessage);

    //init
    requestAlert();

    // Pergunta se existe alertas novos
    const intervalId = setInterval(() => {
      requestAlert();
    }, 10000); // 10 segundos

    return () => {
      window.removeEventListener('message', handleMessage);
      clearInterval(intervalId);
    };
  }, [fetchAlertFromApi, requestAlert]);

  return (
    <WarningsContext.Provider
      value={{ idAlert, error, isLoading, alertas, requestAlert }}
    >
      {children}
    </WarningsContext.Provider>
  );
};

export const useWarnings = () => useContext(WarningsContext);
