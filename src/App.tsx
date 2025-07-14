import MainContainer from "./components/Base/Container/MainContainer";
import { AuthProvider } from "./contexts/AuthProvider";

export default function App() {
  return (
    <AuthProvider>
      <MainContainer/>
    </AuthProvider>
  );
}
