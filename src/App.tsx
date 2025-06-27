import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";
import BreadcrumbsComponent from "./components/BreadCrumber/BreadCrumber";

export default function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Topbar />
      <BreadcrumbsComponent />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar />
      </div>
    </div>
  );
}
