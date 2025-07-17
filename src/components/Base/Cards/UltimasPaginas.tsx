import React, { useEffect, useState } from 'react';
import {
  LayoutDashboard,
  FileText,
  ListOrdered,
  MessageSquare,
  ShoppingCart,
  FileArchive,
  Users,
  Landmark,
  Building2,
  LineChart,
  ShieldCheck,
  BarChartHorizontal,
  Banknote,
  Wallet,
  FileBarChart2,
  Server,
  Settings,
  LifeBuoy,
  DollarSign,
  ChevronRight,
  ArrowLeft,
} from 'lucide-react';
import { useAuth } from '../../../contexts/AuthProvider';
import { getLastPages } from '../../../services/ultimasPaginasService';

interface LinkProps {
  icon: React.ReactNode
  title: string;
  tag: string;
  active?: boolean;
  count: number;
}
const linksDb = [
  {
    icon: <LayoutDashboard className="text-blue-400" size={18} />,
    title: 'Dashboard risco intraday',
    tag: 'Dashboards',
    count: 0
  },
  {
    icon: <FileText className="text-blue-400" size={18} />,
    title: 'Página de negociação',
    tag: 'Negociação',
    count: 0
  },
  {
    icon: <FileText className="text-blue-400" size={18} />,
    title: 'Solicitação de sessões de pós',
    tag: 'Conectividade & infra',
    active: true,
    count: 0
  },
  {
    icon: <ListOrdered className="text-blue-400" size={18} />,
    title: 'Lista de sessões',
    tag: 'Conectividade & infra',
    count: 0
  },
  {
    icon: <MessageSquare className="text-blue-400" size={18} />,
    title: 'Últimos chamados',
    tag: 'Suporte',
    count: 0
  },
  {
    icon: <ShoppingCart className="text-blue-400" size={18} />,
    title: 'Compra de serviços',
    tag: 'Serviços',
    count: 0
  },
  {
    icon: <FileArchive className="text-blue-400" size={18} />,
    title: 'Documentos liquidação',
    tag: 'Documentos & links',
    count: 0
  },
];

const iconMap: Record<string, React.ReactNode> = {
  LayoutDashboard: <LayoutDashboard className="text-blue-400" size={18} />,
  FileText: <FileText className="text-blue-400" size={18} />,
  ListOrdered: <ListOrdered className="text-blue-400" size={18} />,
  MessageSquare: <MessageSquare className="text-blue-400" size={18} />,
  ShoppingCart: <ShoppingCart className="text-blue-400" size={18} />,
  FileArchive: <FileArchive className="text-blue-400" size={18} />,
  Users: <Users className="text-blue-400" size={18}/>,
  Landmark: <Landmark className="text-blue-400" size={18}/>,
  Building2: <Building2 className="text-blue-400" size={18}/>,
  LineChart: <LineChart className="text-blue-400" size={18}/>,
  ShieldCheck: <ShieldCheck className="text-blue-400" size={18}/>,
  BarChartHorizontal: <BarChartHorizontal className="text-blue-400" size={18}/>,
  Banknote: <Banknote className="text-blue-400" size={18}/>,
  Wallet: <Wallet className="text-blue-400" size={18}/>,
  FileBarChart2: <FileBarChart2 className="text-blue-400" size={18}/>,
  Server: <Server className="text-blue-400" size={18}/>,
  Settings: <Settings className="text-blue-400" size={18}/>,
  LifeBuoy: <LifeBuoy className="text-blue-400" size={18}/>,
  DollarSign: <DollarSign className="text-blue-400" size={18}/>,
  ChevronRight: <ChevronRight className="text-blue-400" size={18}/>,
  ArrowLeft: <ArrowLeft className="text-blue-400" size={18}/>,
};

interface UltimasPaginasProps {
  menuPages: (pages: LinkProps[]) => void;
  refreshSignal: number;
}

const UltimasPaginas: React.FC<UltimasPaginasProps> = ({menuPages, refreshSignal}) => {

  const [links, setLinks] = useState<LinkProps[]>([]);
  const { token, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading || !token) return;

    const fetchChamados = async () => {
      try {
        const response: LinkProps[] = await getLastPages();
    
        const parsedLinks = response.map((item: any) => ({
          icon: iconMap[item.icon] || <FileText className="text-blue-400" size={18} />,
          title: item.page,
          tag: item.menu,
          active: true,
          count: Number(item.count)
        }));
    
        
        const sortedLinks = (parsedLinks.length ? parsedLinks : linksDb)
        .sort((a, b) => b.count - a.count);
        setLinks(sortedLinks);
        menuPages(sortedLinks);
      } catch (err) {
        setLinks(linksDb);
        menuPages(linksDb);
        console.error("Erro ao buscar páginas:", err);
      }
    };

    fetchChamados();
  }, [isLoading, token, menuPages, refreshSignal]);
  return (
    <div className="flex flex-col gap-3 pt-1">
      {links.map((item, index) => (
        <div key={index} className="flex items-start gap-2 text-sm">
          <div>{item.icon}</div>
          <div className="flex flex-col">
            <span className={`${item.active ? 'font-semibold underline' : ''}`}>
              {item.title}
            </span>
            <span className="text-gray-400">#{item.tag}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UltimasPaginas;
