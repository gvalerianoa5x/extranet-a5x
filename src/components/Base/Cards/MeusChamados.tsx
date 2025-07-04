import React from 'react';
import StatusIndicator from '@cloudscape-design/components/status-indicator';

const chamados = [
  {
    data: '11/03',
    id: '#58213',
    descricao: 'Você possui uma novidade em seu chamado de revisão de limites.',
    status: 'info',
    label: 'Em aberto',
  },
  {
    data: '11/03',
    id: '#58213',
    descricao: 'Seu chamado de envio de teste de estresse de liquidez foi finalizado com sucesso',
    status: 'success',
    label: 'Concluído',
  },
  {
    data: '11/03',
    id: '#58213',
    descricao: 'Seu chamado de justificativa de estouro de saldo operacional concluído com sucesso.',
    status: 'success',
    label: 'Concluído',
  },
  {
    data: '11/03',
    id: '#58213',
    descricao: 'Chamado cancelado com sucesso.',
    status: 'stopped',
    label: 'Cancelado',
  },
];

const MeusChamados: React.FC = () => {
  return (
    <div className="flex flex-col gap-3 text-sm pt-1">
      {chamados.map((item, index) => (
        <div key={index} className="flex flex-col gap-1">
          <div className="text-gray-500">
            {item.data} <strong>{item.id}</strong>
          </div>
          <div className="flex justify-between items-center gap-2">
            <p className="flex-1">{item.descricao}</p>
            <StatusIndicator type={item.status as any}>{item.label}</StatusIndicator>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MeusChamados;
