
import React, { createContext, useContext, useState } from 'react';
import { Usuario } from '../../types';

type GeneralContextType = {
  usuario: Usuario | null;
  setUsuario: (usuario: Usuario | null) => void;
  carregando: boolean;
  setCarregando: (carregando: boolean) => void;
};

type GeneralContextProps = {
  children: React.ReactNode;
};

const GeneralContext = createContext<GeneralContextType>({} as GeneralContextType);

export const GeneralContextProvider: React.FC<GeneralContextProps> = ({ children }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [carregando, setCarregando] = useState(false);

  return (
    <GeneralContext.Provider value={{
      usuario,
      setUsuario,
      carregando,
      setCarregando
    }}>
      {children}
    </GeneralContext.Provider>
  );
};

export const useGeneralContext = () => useContext(GeneralContext);
