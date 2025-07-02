import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";
import BreadcrumbsComponent from "./components/BreadCrumber/BreadCrumber";
import CarrosselBanner from "./components/CarrosselBanner/CarrosselBanner";
import Cards from "./components/Cards";

export default function App() {
  return (
    <div className="flex flex-col h-screen">
      <Topbar />
      <BreadcrumbsComponent />
      <div className="flex flex-1 bg-[#EDEDED]">
        <Sidebar />
        {/* Conteúdo principal com layout vertical */}
        <div className="flex-1 p-5 overflow-auto">
          {/* CarrosselBanner e Cards em sequência vertical */}
          <CarrosselBanner />
          <Cards />
        </div>
      </div>
    </div>
  );
}