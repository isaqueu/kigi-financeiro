
import React from 'react';
import './App.css';
import { ContextoGeralProvider } from './componentes/ContextoGeral';
import Login from './page/Login';

function App() {
  return (
    <ContextoGeralProvider>
      <Login />
    </ContextoGeralProvider>
  );
}

export default App;
