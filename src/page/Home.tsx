import React from 'react';
import { useContextoGeral } from '../componentes/ContextoGeral';

const Home: React.FC = () => {
  const { usuario } = useContextoGeral();

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">
            Bem-vindo, {usuario?.nome}!
          </h1>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="text-xl font-semibold mb-4">Informações do Usuário</h2>
              <p className="mb-2">Email: {usuario?.email}</p>
              <p>Perfil: {usuario?.perfil}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;