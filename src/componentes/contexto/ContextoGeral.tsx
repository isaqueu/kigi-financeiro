
import React, { createContext, useContext, useState } from 'react';
import { Usuario } from '../../types';

type ContextoGeralType = {
  usuario: Usuario | null;
  setUsuario: (usuario: Usuario | null) => void;
  carregando: boolean;
  setCarregando: (carregando: boolean) => void;
};

type ContextoGeralProps = {
  children: React.ReactNode;
};

const ContextoGeral = createContext<ContextoGeralType>({} as ContextoGeralType);

export const ContextoGeralProvider: React.FC<ContextoGeralProps> = ({ children }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [carregando, setCarregando] = useState(false);

  return (
    <ContextoGeral.Provider value={{
      usuario,
      setUsuario,
      carregando,
      setCarregando
    }}>
      {children}
    </ContextoGeral.Provider>
  );
};

export const useContextoGeral = () => useContext(ContextoGeral);
