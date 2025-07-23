//import { CXThemeProvider } from "@a5x/connect-x";
import MainContainer from "./components/Base/Container/MainContainer";
import { AuthProvider } from "./contexts/AuthProvider";
import { WarningsProvider } from "./contexts/WarningsProvider";

export default function App() {
  return (
    //<CXThemeProvider environment={"prod"}>
    <AuthProvider>
      <WarningsProvider>
        <MainContainer/>
      </WarningsProvider>
    </AuthProvider>
    //</CXThemeProvider>
  );
}
