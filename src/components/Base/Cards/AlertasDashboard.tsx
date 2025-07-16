import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';
import { getAlertas } from '../../../services/alertasBolsaService';
import type { AlertaItem } from '../../../services/alertasBolsaService';
import { useAuth } from '../../../contexts/AuthProvider';

const AlertasDashboard: React.FC = () => {
  const [alertas, setAlertas] = useState<AlertaItem[]>([]);
  const { token, isLoading } = useAuth();
    
  useEffect(() => {
    if (isLoading || !token) return;

    const fetchAlertas = async () => {
      try {
        const response = await getAlertas();
        setAlertas(response);
      } catch (error) {
        console.error('Erro ao carregar alertas:', error);
        setAlertas([]);
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
  
  if (alertas.length === 0) {
    return <div>Carregando...</div>;
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
    </div>
  );
};

export default AlertasDashboard;