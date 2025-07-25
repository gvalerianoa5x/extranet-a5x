import { useState } from 'react';
import Topbar from '../Topbar/Topbar';
import { Clock, Menu, MessageSquare, Truck } from 'lucide-react';
import BreadcrumbsComponent from '../Topbar/BreadCrumber/BreadCrumber';
import Sidebar from '../Topbar/Sidebar';
import Atalhos from '../Topbar/Atalhos';
import { SnackBarAlert } from '../../Home/Snackbar/Snackbar';
import CarrosselBanner from '../../Home/CarrosselBanner/CarrosselBanner';
import Card from '../Cards/CardContainer';
import UltimasPaginas from '../Cards/UltimasPaginas';
import AlertasDashboard from '../Cards/AlertasDashboard';
import MeusChamados from '../Cards/MeusChamados';
import ModaisSelecao from '../ModaisSelecao';
//import { CXTopNavigation } from '../../../../../connect-x-design-system/dist/components/CXTopNavigation/CXTopNavigation'

interface LinkProps {
  icon: React.ReactNode;
  title: string;
  tag: string;
  active?: boolean;
  count: number;
}

type DadosSelecionados = {
  participantCode: {
    label: string;
    value: string;
  };
  participationType: any;
  environmentType: {
    label: string;
    value: string;
  };
};

export default function MainContainer() {
  const [exibirModais, setExibirModais] = useState(true);
  const [dadosSelecionados, setDadosSelecionados] = useState<DadosSelecionados | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [menuPages, setMenuPages] = useState<LinkProps[]>([]);
  const [refreshPages, setRefreshPages] = useState(0);

  const handleCountUpdated = () => {
    setRefreshPages((prev) => prev + 1);
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  return (
    <div className="flex flex-col h-screen">
     {/*<CXTopNavigation
      brokerImage={'/corretora.png'} 
      brokerSelectAction={() => { } } 
      brokerSelected='Rico Investimentos' 
      submitInputSearchParam={() => {} } 
      placeholderSearchInput={'Pesquise recursos, documentos, produtos e muito mais'} 
      environmentSelected={'Ambiente Desenvolvimento'} 
      ariaLabel={'Rico Investimentos'} />*/}
      <Topbar
        onClickTitle={() => setExibirModais(true)}
        titulo={dadosSelecionados?.participantCode.label ?? ''}
        envType={dadosSelecionados?.environmentType.label ?? ''}
      />

      <div className="flex flex-row items-center w-full">
        <div className="p-4 bg-neutral-5">
          <button
            onClick={toggleSidebar}
            className="flex items-center justify-center w-8 h-8 bg-blue-600 hover:bg-blue-700 text-white rounded"
          >
            <Menu size={16} />
          </button>
        </div>
        <BreadcrumbsComponent />
      </div>
      <div className="flex flex-1 bg-[#EDEDED]">
        <Sidebar
          permissionRule={`${dadosSelecionados?.participantCode.value}`}
          isCollapsed={isSidebarCollapsed}
          pages={menuPages}
          onCountUpdated={handleCountUpdated}
        />
        <div className="flex-1 bg-white">
          <div className="flex flex-col">
            <div className="flex items-start">
              <Atalhos />
            </div>
            <div className="p-7 flex flex-col space-y-4">
              <SnackBarAlert />
              <CarrosselBanner />
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <Card title="Últimas páginas visitadas" icon={<Clock size={16} />}>
                  <UltimasPaginas
                    menuPages={menuPages}
                    setMenuPages={setMenuPages}
                    refreshSignal={refreshPages}
                  />
                </Card>
                <Card title="Alertas da bolsa" icon={<Truck size={16} />}>
                  <AlertasDashboard />
                </Card>
                <Card title="Meus chamados" icon={<MessageSquare size={16} />}>
                  <MeusChamados />
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      {exibirModais && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-40 flex items-center justify-center">
          <ModaisSelecao
            onFinalizar={(dados) => {
              setDadosSelecionados(dados);
              setExibirModais(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
