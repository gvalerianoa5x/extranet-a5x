import { useState } from "react";
import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";
import BreadcrumbsComponent from "./components/BreadCrumber/BreadCrumber";
import CarrosselBanner from "./components/CarrosselBanner/CarrosselBanner";
import ModaisSelecao from "./components/ModaisSelecao";
import Card from "./components/Card";
import UltimasPaginas from "./components/UltimasPaginas";
import { Clock, ListChecks, MessageSquare, Truck } from "lucide-react";
import TarefasProducao from "./components/TarefasProducao";
import AlertasDashboard from "./components/AlertasDashboard";
import MeusChamados from "./components/MeusChamados";

export default function App() {
  const [exibirModais, setExibirModais] = useState(true);
  const [dadosSelecionados, setDadosSelecionados] = useState<{
    participantCode: any;
    participationType: any;
    environmentType: any;
  } | null>(null);

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

      <BreadcrumbsComponent />

      <div className="flex flex-1 bg-[#EDEDED]">
        <Sidebar
          permissionRule={`${dadosSelecionados?.participantCode.value}`}
        />
        <div className="flex-1 p-5 overflow-auto">
          <CarrosselBanner />
          <div className="p-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <Card title="Últimas páginas visitadas" icon={<Clock size={16} />}>
              <UltimasPaginas />
            </Card>

            <Card title="Tarefas produção" icon={<ListChecks size={16} />}>
              <TarefasProducao />
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
            backgroundColor: "rgba(0, 0, 0, 1)",
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
