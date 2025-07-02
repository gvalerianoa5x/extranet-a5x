import CarrosselBanner from "./components/Home/CarrosselBanner/CarrosselBanner";
import { SnackBarAlert } from "./components/Home/Snackbar/Snackbar";

import Sidebar from "./components/Base/Topbar/Sidebar";
import Topbar from "./components/Base/Topbar/Topbar";
import BreadcrumbsComponent from "./components/Base/Topbar/BreadCrumber/BreadCrumber";


export default function App() {
  function handleActionClick(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="flex flex-col h-screen">
      <Topbar />
      <BreadcrumbsComponent />
      <div className="flex flex-1 bg-[#EDEDED]">
        <Sidebar />
        <div className="flex-1 p-5 overflow-auto">
          <div className="pb-5">
            <SnackBarAlert buttonText="buttom" onButtonClick={() => {}} message={"Header message"} type="warning"/>
          </div>

          <CarrosselBanner />
        </div>
      </div>
    </div>
  );
}