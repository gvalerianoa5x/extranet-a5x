import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';
import { getAlertas } from '../../../services/alertasBolsaService';
import type { AlertaItem } from '../../../services/alertasBolsaService';
import { useAuth } from '../../../contexts/AuthProvider';
import { useWarnings } from '../../../hooks/useWarnings';

const AlertasDashboard: React.FC = () => {
  const [alertas, setAlertas] = useState<AlertaItem[]>([]);
  const [loading, setLoading] = useState(true); // Estado de loading
  const { token, isLoading } = useAuth();

  const { idAlert, error, requestAlert } = useWarnings();

  // Enviar sinal para aplicação pai a cada 10 segundos
  useEffect(() => {
    const intervalId = setInterval(() => {
      requestAlert();
    }, 10000);

    return () => clearInterval(intervalId);
  }, [requestAlert]);

  // Carregar alertas se autenticado
  useEffect(() => {
    if (isLoading || !token) return;

    const fetchAlertas = async () => {
      setLoading(true); // Inicia loading
      try {
        const response = await getAlertas();
        setAlertas(response);
      } catch (error) {
        console.error('Erro ao carregar alertas:', error);
        setAlertas([]);
      } finally {
        setLoading(false); // Finaliza loading
      }
    };

    fetchAlertas();
  }, [isLoading, token]);

  const renderIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="text-green-500" size={24} />;
      case 'warning':
        return <AlertCircle className="text-yellow-500" size={24} />;
      case 'critical':
        return <AlertTriangle className="text-red-500" size={24} />;
      case 'muted':
        return <Info className="text-gray-300" size={24} />;
      default:
        return null;
    }
  };

  // Mostrar loading enquanto carrega
  if (loading || isLoading) {
    return <div>Carregando...</div>;
  }

  // Mostrar mensagem quando não há alertas
  if (alertas.length === 0) {
    return <div>Não há alertas para exibição...</div>;
  }

  return (
    <div className="space-y-3 text-sm pt-1">
      {alertas.map((alert) => (
        <div
          key={alert.id}
          className={`flex items-start gap-2 ${
            alert.type === 'muted' ? 'text-gray-400 line-through' : 'text-gray-800'
          }`}
        >
          {renderIcon(alert.type)}
          <span className="leading-snug">{alert.message}</span>
        </div>
      ))}

      {/* Opcional: mostrar o idAlert recebido */}
      {idAlert && (
        <div className="text-xs text-blue-500 pt-2">
          Último alerta da plataforma pai: {idAlert}
        </div>
      )}

      {/* Opcional: mostrar erro */}
      {error && (
        <div className="text-xs text-red-500 pt-2">
          Erro ao receber alerta: {error}
        </div>
      )}
    </div>
  );
};

export default AlertasDashboard;
