
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ContextoGeralProvider } from './componentes/contexto/ContextoGeral';
import Login from './page/Login';
import Home from './page/Home';
import { useContextoGeral } from './componentes/contexto/ContextoGeral';

function App() {
  return (
    <BrowserRouter>
      <ContextoGeralProvider>
        <Routes>
          <Route 
            path="/login" 
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } 
          />
          <Route 
            path="/home" 
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            } 
          />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </ContextoGeralProvider>
    </BrowserRouter>
  );
}

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { usuarioLogado } = useContextoGeral();
  return usuarioLogado ? children : <Navigate to="/login" replace />;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { usuarioLogado } = useContextoGeral();
  return usuarioLogado ? <Navigate to="/home" replace /> : children;
};

export default App;
