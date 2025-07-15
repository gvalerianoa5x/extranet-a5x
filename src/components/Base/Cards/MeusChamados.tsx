import React, { useEffect, useState } from 'react';
import StatusIndicator from '@cloudscape-design/components/status-indicator';
import { getMyTickets } from '../../../services/chamadosService';
import { useAuth } from '../../../contexts/AuthProvider';

interface ChamadoProps {
  data: string;
  id: string;
  descricao: string;
  status: 'pending' | 'success' | 'loading' | 'error';
  label: string;
  color: string;
}

/*
const chamados = [
  {
    data: '11/03',
    id: '#58213',
    descricao: 'Você possui uma novidade em seu chamado de revisão de limites.',
    status: 'pending',
    label: 'Em aberto',
    color: 'blue'
  },
  {
    data: '11/03',
    id: '#58213',
    descricao: 'Seu chamado de envio de teste de estresse de liquidez foi finalizado com sucesso',
    status: 'success',
    label: 'Concluído',
    color: 'green'
  },
  {
    data: '11/03',
    id: '#58213',
    descricao: 'Seu chamado de justificativa de estouro de saldo operacional concluído com sucesso.',
    status: 'success',
    label: 'Concluído',
    color: 'green'
  },
  {
    data: '11/03',
    id: '#58213',
    descricao: 'Chamado em andamento com sucesso.',
    status: 'loading',
    label: 'Em Andamento',
    color: 'yellow'
  },
  {
    data: '11/03',
    id: '#58213',
    descricao: 'Chamado cancelado.',
    status: 'error',
    label: 'Cancelado',
    color: 'grey'
  },
  
];*/

const MeusChamados: React.FC = () => {
  const [chamados, setChamados] = useState<ChamadoProps[]>([]);

  const { token, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading || !token) return;
  
    const fetchChamados = async () => {
      const data = await getMyTickets();
      setChamados(data);
    };
  
    fetchChamados();
  }, [isLoading, token]);
  return (
    <div className="flex flex-col gap-3 text-sm pt-1">
      {chamados.map((item, index) => (
        <div key={index} className="flex flex-col gap-1">
          <div className="text-gray-500">
            {item.data} <strong>{item.id}</strong>
          </div>
          <div className="flex justify-between items-center gap-2">
            <p className="flex-1">{item.descricao}</p>
            <StatusIndicator colorOverride={item.color as any} type={item.status as any}>{item.label}</StatusIndicator>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MeusChamados;
