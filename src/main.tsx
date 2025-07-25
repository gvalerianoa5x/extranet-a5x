import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import '@cloudscape-design/global-styles/index.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
