import React, { useState } from 'react';
import './MeusChamados.css';
import { Truck } from 'lucide-react';
import { RunningIcon } from '../Icons/RunningIcon/RunningIcon'; 
import { CheckIcon } from '../Icons/CheckIcon/CheckIcon';
import { CancelIcon } from '../Icons/CancelIcon/CancelIcon';

interface Chamado {
  id: string;
  data: string;
  descricao: string;
  status: 'em_andamento' | 'concluido' | 'cancelado';
}

const chamadosMock: Chamado[] = [
  {
    id: '#58213',
    data: '11/03',
    descricao: 'Você possui uma novidade em seu chamado de solicitação de infraestrutura.',
    status: 'em_andamento'
  },
  {
    id: '#58213',
    data: '11/03',
    descricao: 'Seu chamado de solicitação de sessões de negociação foi concluído com sucesso.',
    status: 'concluido'
  },
  {
    id: '#58213',
    data: '11/03',
    descricao: 'Chamado cancelado com sucesso.',
    status: 'cancelado'
  },
  {
    id: '#58213',
    data: '11/03',
    descricao: 'Chamado cancelado com sucesso.',
    status: 'cancelado'
  },
  {
    id: '#57985',
    data: '10/03',
    descricao: 'Solicitação de ajustes em permissões de usuários em andamento.',
    status: 'em_andamento'
  },
  {
    id: '#57842',
    data: '10/03',
    descricao: 'Configuração de ambiente de homologação realizada com sucesso.',
    status: 'concluido'
  },
  {
    id: '#57810',
    data: '09/03',
    descricao: 'Pedido de suporte para integração de APIs concluído.',
    status: 'concluido'
  },
  {
    id: '#57789',
    data: '09/03',
    descricao: 'Requisição de novo relatório personalizado em processamento.',
    status: 'em_andamento'
  },
  {
    id: '#57750',
    data: '08/03',
    descricao: 'Chamado sobre falha no acesso ao sistema foi cancelado a seu pedido.',
    status: 'cancelado'
  },
  {
    id: '#57732',
    data: '08/03',
    descricao: 'Solicitação de treinamento para novos funcionários agendada.',
    status: 'em_andamento'
  },
  {
    id: '#57715',
    data: '07/03',
    descricao: 'Implementação de nova feature de segurança concluída com sucesso.',
    status: 'concluido'
  },
  {
    id: '#57698',
    data: '07/03',
    descricao: 'Chamado de atualização de certificados SSL cancelado.',
    status: 'cancelado'
  },
  {
    id: '#57650',
    data: '06/03',
    descricao: 'Solicitação de aumento de limite operacional em análise.',
    status: 'em_andamento'
  },
  {
    id: '#57633',
    data: '06/03',
    descricao: 'Seu chamado de suporte para migração de dados foi finalizado.',
    status: 'concluido'
  },
  {
    id: '#57620',
    data: '05/03',
    descricao: 'Requisição de revisão de contrato cancelada.',
    status: 'cancelado'
  },
  {
    id: '#57598',
    data: '05/03',
    descricao: 'Implementação de dashboard personalizado em progresso.',
    status: 'em_andamento'
  },
  {
    id: '#57580',
    data: '04/03',
    descricao: 'Chamado de solicitação de backup de dados finalizados.',
    status: 'concluido'
  },
  {
    id: '#57562',
    data: '04/03',
    descricao: 'Solicitação de acesso VPN para novo colaborador em análise.',
    status: 'em_andamento'
  }
];

const MeusChamados: React.FC = () => {
  const [paginaAtual, setPaginaAtual] = useState(1);
  const chamadosPorPagina = 6;
  const totalPaginas = Math.ceil(chamadosMock.length / chamadosPorPagina);
  
  const chamadosPaginados = chamadosMock.slice(
    (paginaAtual - 1) * chamadosPorPagina,
    paginaAtual * chamadosPorPagina
  );
  
  const irParaPagina = (pagina: number) => {
    if (pagina >= 1 && pagina <= totalPaginas) {
      setPaginaAtual(pagina);
    }
  };
  
  const renderizarStatus = (status: Chamado['status']) => {
    switch (status) {
      case 'em_andamento':
        return (
          <div className="status-badge em-andamento">
            <RunningIcon size={16} /> Em andamento
          </div>
        );
      case 'concluido':
        return (
          <div className="status-badge concluido">
            <CheckIcon size={16} /> Concluído
          </div>
        );
      case 'cancelado':
        return (
          <div className="status-badge cancelado">
            <CancelIcon size={16} /> Cancelado
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="meus-chamados-card">
      <div className="meus-chamados-header">
        <div className="meus-chamados-titulo">
          <Truck size={20} />
          <h2>Meus chamados</h2>
        </div>
        <a href="#" className="novo-chamado-link">Abrir novo chamado</a>
      </div>
      
      <div className="meus-chamados-lista">
        {chamadosPaginados.map((chamado, index) => (
          <div className="chamado-item" key={index}>
            <div className="chamado-info">
              <div className="chamado-cabecalho">
                <span className="chamado-data">{chamado.data}</span>
                <span className="chamado-separador">|</span>
                <span className="chamado-id">{chamado.id}</span>
              </div>
              <p className="chamado-descricao">{chamado.descricao}</p>
            </div>
            <div className="chamado-status">
              {renderizarStatus(chamado.status)}
            </div>
          </div>
        ))}
      </div>
      
      {totalPaginas > 1 && (
        <div className="meus-chamados-paginacao">
          <button 
            onClick={() => irParaPagina(paginaAtual - 1)}
            disabled={paginaAtual === 1}
            className="btn-paginacao"
          >
            &lt;
          </button>
          
          {[...Array(totalPaginas)].map((_, i) => (
            <button 
              key={i} 
              onClick={() => irParaPagina(i + 1)}
              className={`btn-paginacao ${paginaAtual === i + 1 ? 'ativo' : ''}`}
            >
              {i + 1}
            </button>
          ))}
          
          <button 
            onClick={() => irParaPagina(paginaAtual + 1)}
            disabled={paginaAtual === totalPaginas}
            className="btn-paginacao"
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
};

export default MeusChamados;