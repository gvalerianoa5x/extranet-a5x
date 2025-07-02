import Topbar from "./components/Topbar/Topbar";
import Sidebar from "./components/Topbar/Sidebar";
import BreadcrumbsComponent from "./components/Topbar/BreadCrumber/BreadCrumber";
import { SnackBarAlert } from "./components/Home/Snackbar/Snackbar";

export default function App() {
  function handleActionClick(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Topbar />
      <BreadcrumbsComponent />
      <div style={{ display: 'flex', flex: 1, gap: 24 }}>
        <Sidebar />
        <div className="w-full p-4">
           <SnackBarAlert
            message="Este é um exemplo de alerta com ícone, mensagem e botão."
            buttonText="Clique aqui"
            onButtonClick={handleActionClick}
            type="warning" title={""}      />
        </div>
      </div>
    </div>
  );
}
