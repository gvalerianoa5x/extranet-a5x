import MainContainer from "./components/Base/Container/MainContainer";
import { AuthProvider } from "./contexts/AuthProvider";
import { WarningsProvider } from "./contexts/WarningsProvider";

export default function App() {
  return (
    <AuthProvider>
      <WarningsProvider>
        <MainContainer/>
      </WarningsProvider>
    </AuthProvider>
  );
}
