import React from 'react';
import {
  AlertCircle,
  CheckCircle,
  Info,
  AlertTriangle,
} from 'lucide-react';
import { useAuth } from '../../../contexts/AuthProvider';
import { useWarnings } from '../../../contexts/WarningsProvider';


const AlertasDashboard: React.FC = () => {
  const { token, isLoading: isAuthLoading } = useAuth();
  const { alertas, idAlert, error } = useWarnings();

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

  if (isAuthLoading || !token) {
    return <div>Verificando autenticação...</div>;
  }

  if (error) {
    return (
      <div className="text-sm text-red-500">
        Erro ao carregar alertas: {error}
      </div>
    );
  }

  if (alertas.length === 0) {
    return <div className="text-sm text-gray-500">Nenhum alerta disponível.</div>;
  }

  return (
    <div className="space-y-3 text-sm pt-1">
      {alertas.map((alert) => (
        <div
          key={alert.id}
          className={`flex items-start gap-2 ${
            alert.type === 'muted'
              ? 'text-gray-400 line-through'
              : 'text-gray-800'
          }`}
        >
          {renderIcon(alert.type)}
          <span className="leading-snug">{alert.message}</span>
        </div>
      ))}

      {idAlert && (
        <div className="text-xs text-blue-500 pt-2">
          Último alerta da plataforma pai: {idAlert}
        </div>
      )}
    </div>
  );
};

export default AlertasDashboard;
