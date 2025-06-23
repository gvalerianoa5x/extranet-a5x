import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";

export default function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Topbar />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar />
      </div>
    </div>
  );
}