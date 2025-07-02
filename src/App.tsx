import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";
import BreadcrumbsComponent from "./components/BreadCrumber/BreadCrumber";
import CarrosselBanner from "./components/CarrosselBanner/CarrosselBanner";

export default function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Topbar />
      <BreadcrumbsComponent />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar />
        <div style={{ flex: 1, padding: '20px', overflow: 'auto' }}>
          <CarrosselBanner />
        </div>
      </div>
    </div>
  );
}