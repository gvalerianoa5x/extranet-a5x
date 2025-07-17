import { useState } from "react";
import Topbar from "../Topbar/Topbar";
import { Clock, Menu, MessageSquare, Truck } from "lucide-react";
import BreadcrumbsComponent from "../Topbar/BreadCrumber/BreadCrumber";
import Sidebar from "../Topbar/Sidebar";
import Atalhos from "../Topbar/Atalhos";
import { SnackBarAlert } from "../../Home/Snackbar/Snackbar";
import CarrosselBanner from "../../Home/CarrosselBanner/CarrosselBanner";
import Card from "../Cards/CardContainer";
import UltimasPaginas from "../Cards/UltimasPaginas";
import AlertasDashboard from "../Cards/AlertasDashboard";
import MeusChamados from "../Cards/MeusChamados";
import ModaisSelecao from "../ModaisSelecao";

interface LinkProps {
  icon: React.ReactNode
  title: string;
  tag: string;
  active?: boolean;
  count: number;
}
export default function MainContainer(){
  const [menuPages, setMenuPages] = useState<LinkProps[]>([]);
  const [exibirModais, setExibirModais] = useState(true);
  const [dadosSelecionados, setDadosSelecionados] = useState<{
    participantCode: any;
    participationType: any;
    environmentType: any;
  } | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  function handleActionClick(): void {
    throw new Error("Function not implemented.");
  }

  const [refreshPages, setRefreshPages] = useState(0);

  const handleCountUpdated = () => {
    setRefreshPages(prev => prev + 1);
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };
  return (
    <div className="flex flex-col h-screen">
      <Topbar
        onClickTitle={() => setExibirModais(true)}
        titulo={
          dadosSelecionados ? `${dadosSelecionados.participantCode.label}` : ""
        }
        envType={
          dadosSelecionados ? `${dadosSelecionados.environmentType.label}` : ""
        }
      />

      <div className="flex flex-row items-center w-full">
        <div className="p-4 bg-neutral-5">
          <button
            onClick={toggleSidebar}
            className="flex items-center justify-center w-8 h-8 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors duration-200"
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

        <div className="flex-1 p-5 overflow-auto space-y-5">
          <Atalhos />

          <SnackBarAlert
            buttonText="buttom"
            onButtonClick={handleActionClick}
            message={"Header message"}
            type="warning"
          />

          <CarrosselBanner />

          <div className="p-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <Card title="Últimas páginas visitadas" icon={<Clock size={16} />}>
              <UltimasPaginas 
              menuPages={setMenuPages}
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

      {exibirModais && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.95)",
            zIndex: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
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