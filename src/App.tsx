import { useState } from "react";

import ModaisSelecao from "./components/ModaisSelecao";
import { SnackBarAlert } from "./components/Home/Snackbar/Snackbar";
import BreadcrumbsComponent from "./components/Base/Topbar/BreadCrumber/BreadCrumber";
import Topbar from "./components/Base/Topbar/Topbar";
import CarrosselBanner from "./components/Home/CarrosselBanner/CarrosselBanner";
import Cards from "./components/Base/Cards";
import Sidebar from "./components/Base/Topbar/Sidebar";

export default function App() {
  const [exibirModais, setExibirModais] = useState(false);

  function handleActionClick(): void {
    throw new Error("Function not implemented.");
  }
  return (
    <div className="flex flex-col h-screen">
      <Topbar onClickTitle={() => setExibirModais(true)} />

      <BreadcrumbsComponent />

      <div className="flex flex-1 bg-[#EDEDED]">
        <Sidebar />
        <div className="flex-1 p-5 overflow-auto">
          <div className="pb-5">
            <SnackBarAlert buttonText="buttom" onButtonClick={handleActionClick} message={"Header message"} type="warning"/>
          </div>
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