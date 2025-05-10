
import React, { createContext, useContext, useState } from 'react';
import { Usuario } from '../types';

type ContextoGeralType = {
  usuario: Usuario | null;
  setUsuario: (usuario: Usuario | null) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
};

type ContextoGeralProps = {
  children: React.ReactNode;
};

const ContextoGeral = createContext<ContextoGeralType>({} as ContextoGeralType);

export const ContextoGeralProvider: React.FC<ContextoGeralProps> = ({ children }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <ContextoGeral.Provider value={{
      usuario,
      setUsuario,
      loading,
      setLoading
    }}>
      {children}
    </ContextoGeral.Provider>
  );
};

export const useContextoGeral = () => useContext(ContextoGeral);
