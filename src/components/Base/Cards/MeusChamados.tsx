import React, { useEffect, useState } from 'react';
import StatusIndicator from '@cloudscape-design/components/status-indicator';
import { getMyTickets } from '../../../services/chamadosService';
import { useAuth } from '../../../contexts/AuthProvider';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface ChamadoProps {
  data: string;
  id: string;
  descricao: string;
  status: 'pending' | 'success' | 'loading' | 'error';
  label: string;
  color: string;
}

const MeusChamados: React.FC = () => {
  const [chamados, setChamados] = useState<ChamadoProps[]>([]);
  const { token, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading || !token) return;

    const fetchChamados = async () => {
      const response = await getMyTickets();

      const chamadosFormatados = response.map((item: ChamadoProps) => {
        const dataIso = item.data.replace(' ', 'T'); 
        const dataFormatada = format(parseISO(dataIso), 'dd/MM/yyyy HH:mm', { locale: ptBR });

        return {
          ...item,
          data: dataFormatada,
        };
      });

      setChamados(chamadosFormatados);
    };

    fetchChamados();
  }, [isLoading, token]);

  return (
    <div className="flex flex-col gap-3 text-sm pt-1">
      {chamados.map((item, index) => (
        <div key={index} className="flex flex-col gap-1">
          <div className="text-gray-500">
            {item.data} <strong>#{item.id}</strong>
          </div>
          <div className="flex justify-between items-center gap-2">
            <p className="flex-1">{item.descricao}</p>
            <StatusIndicator colorOverride={item.color as any} type={item.status as any}>
              {item.label}
            </StatusIndicator>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MeusChamados;
