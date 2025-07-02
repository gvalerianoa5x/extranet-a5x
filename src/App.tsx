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
          <Sidebar/>
          <div style={{ flex: 1, padding: '20px', overflow: 'auto' }}>
            <CarrosselBanner />
          </div>
          <div className="bg-white flex-1">
            <Cards/>
          </div>
        </div>
    </div>
  );
}