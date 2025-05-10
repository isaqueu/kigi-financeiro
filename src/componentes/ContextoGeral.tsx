
import React, { createContext, useContext, useState } from 'react';
import { Usuario } from '../types';

// Define o tipo do contexto geral da aplicação
type ContextoGeralType = {
  usuario: Usuario | null;
  setUsuario: (usuario: Usuario | null) => void;
  carregando: boolean;
  setCarregando: (carregando: boolean) => void;
};

// Props do provedor de contexto
type ContextoGeralProps = {
  children: React.ReactNode;
};

// Cria o contexto com valor inicial vazio
const ContextoGeral = createContext<ContextoGeralType>({} as ContextoGeralType);

// Provedor do contexto geral que gerencia o estado do usuário e carregamento
export const ContextoGeralProvider: React.FC<ContextoGeralProps> = ({ children }) => {
  // Estado para armazenar dados do usuário logado
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  // Estado para controlar loading global
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

// Hook personalizado para acessar o contexto
export const useContextoGeral = () => useContext(ContextoGeral);
