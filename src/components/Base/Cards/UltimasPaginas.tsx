import React from 'react';
import {
  LayoutDashboard,
  FileText,
  ListOrdered,
  MessageSquare,
  ShoppingCart,
  FileArchive,
} from 'lucide-react';

const links = [
  {
    icon: <LayoutDashboard className="text-blue-400" size={18} />,
    title: 'Dashboard risco intraday',
    tag: '#Risco',
  },
  {
    icon: <FileText className="text-blue-400" size={18} />,
    title: 'Página de negociação',
    tag: '#Negociação',
  },
  {
    icon: <FileText className="text-blue-400" size={18} />,
    title: 'Solicitação de sessões de pós',
    tag: '#Conectividade & infra',
    active: true,
  },
  {
    icon: <ListOrdered className="text-blue-400" size={18} />,
    title: 'Lista de sessões',
    tag: '#Conectividade & infra',
  },
  {
    icon: <MessageSquare className="text-blue-400" size={18} />,
    title: 'Últimos chamados',
    tag: '#Suporte',
  },
  {
    icon: <ShoppingCart className="text-blue-400" size={18} />,
    title: 'Compra de serviços',
    tag: '#Serviços',
  },
  {
    icon: <FileArchive className="text-blue-400" size={18} />,
    title: 'Documentos liquidação',
    tag: '#Documentos & links',
  },
];

const UltimasPaginas: React.FC = () => {
  return (
    <div className="flex flex-col gap-3 pt-1">
      {links.map((item, index) => (
        <div key={index} className="flex items-start gap-2 text-sm">
          <div>{item.icon}</div>
          <div className="flex flex-col">
            <span className={`${item.active ? 'font-semibold underline' : ''}`}>
              {item.title}
            </span>
            <span className="text-gray-400">{item.tag}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UltimasPaginas;
