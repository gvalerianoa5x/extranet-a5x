import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";
import BreadcrumbsComponent from "./components/BreadCrumber/BreadCrumber";
import Cards from "./components/Cards";

export default function App() {
  return (
    <div className="flex flex-col h-screen">
        <Topbar />
        <BreadcrumbsComponent />
        <div className="flex flex-1 bg-[#EDEDED]">
          <Sidebar/>
          <div className="bg-white flex-1">
            <Cards/>
          </div>
        </div>
    </div>
  );
}
