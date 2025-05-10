import React, { JSX, ReactNode } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ContextoGeralProvider } from "./componentes/contexto/ContextoGeral";
import Login from "./page/Login";
import Home from "./page/Home";
import { useContextoGeral } from "./componentes/contexto/ContextoGeral";

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

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps): JSX.Element => {
  const { usuarioLogado } = useContextoGeral();
  return usuarioLogado ? <>{children}</> : <Navigate to="/login" replace />;
};

interface PublicRouteProps {
  children: ReactNode;
}

const PublicRoute = ({ children }: PublicRouteProps): JSX.Element => {
  const { usuarioLogado } = useContextoGeral();
  return usuarioLogado ? <Navigate to="/home" replace /> : <>{children}</>;
};

export default App;
