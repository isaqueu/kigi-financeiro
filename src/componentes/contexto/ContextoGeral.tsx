import React, { createContext, useContext, useState } from "react";
import { UsuarioLogado } from "../../types";

type ContextoGeralType = {
  usuarioLogado: UsuarioLogado | null;
  setUsuarioLogado: (usuarioLogado: UsuarioLogado | null) => void;
  carregando: boolean;
  setCarregando: (carregando: boolean) => void;
};

type ContextoGeralProps = {
  children: React.ReactNode;
};

const ContextoGeral = createContext<ContextoGeralType>({} as ContextoGeralType);

export const ContextoGeralProvider: React.FC<ContextoGeralProps> = ({
  children,
}) => {
  const [usuarioLogado, setUsuarioLogado] = useState<UsuarioLogado | null>(
    null,
  );
  const [carregando, setCarregando] = useState(false);

  return (
    <ContextoGeral.Provider
      value={{
        usuarioLogado,
        setUsuarioLogado,
        carregando,
        setCarregando,
      }}
    >
      {children}
    </ContextoGeral.Provider>
  );
};

export const useContextoGeral = () => useContext(ContextoGeral);
