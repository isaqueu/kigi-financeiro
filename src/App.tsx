
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ContextoGeralProvider } from './componentes/ContextoGeral';
import Login from './page/Login';
import Home from './page/Home';
import { useContextoGeral } from './componentes/ContextoGeral';

const RotaProtegida = ({ children }: { children: JSX.Element }) => {
  const { usuario } = useContextoGeral();
  if (!usuario) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const AppRoutes = () => {
  const { usuario } = useContextoGeral();
  
  return (
    <Routes>
      <Route path="/login" element={
        usuario ? <Navigate to="/home" replace /> : <Login />
      } />
      <Route path="/home" element={
        <RotaProtegida>
          <Home />
        </RotaProtegida>
      } />
      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <BrowserRouter>
      <ContextoGeralProvider>
        <AppRoutes />
      </ContextoGeralProvider>
    </BrowserRouter>
  );
}

export default App;
