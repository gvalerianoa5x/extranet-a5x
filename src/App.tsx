import { useState } from "react";
import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";
import BreadcrumbsComponent from "./components/BreadCrumber/BreadCrumber";
import CarrosselBanner from "./components/CarrosselBanner/CarrosselBanner";
import Cards from "./components/Cards";
import ModaisSelecao from "./components/ModaisSelecao";

export default function App() {
  const [exibirModais, setExibirModais] = useState(false);

  return (
    <div className="flex flex-col h-screen">
      <Topbar onClickTitle={() => setExibirModais(true)} />

      <BreadcrumbsComponent />

      <div className="flex flex-1 bg-[#EDEDED]">
        <Sidebar />
        <div className="flex-1 p-5 overflow-auto">
          <CarrosselBanner />
          <Cards />
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
          <ModaisSelecao onFinalizar={() => setExibirModais(false)} />
        </div>
      )}
    </div>
  );
}
