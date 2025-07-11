import MainContainer from "./components/Base/Container/MainContainer";

export default function App() {
  // Código de debug - remover em produção
  window.addEventListener('message', function(event) {
    console.log('Mensagem recebida:', event.data);
    console.log('Origem:', event.origin);
  });

  // Verificar se está em iframe
  if (window.parent !== window) {
    console.log('Aplicação rodando dentro de iframe');
    window.parent.postMessage({ type: 'REQUEST_TOKEN' }, '*');
  } else {
    console.log('Aplicação rodando standalone');
  }
  return (
    <MainContainer/>
  );
}
