
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useContextoGeral } from '../componentes/contexto/ContextoGeral';
import { Button } from '../componentes/ui/button';

import Header from '../componentes/Header';

const Home: React.FC = () => {
  const { usuarioLogado } = useContextoGeral();

  return (
    <div className="min-h-screen bg-blue-200">
      <Header />

      {/* Conteúdo Principal */}
      <div className="flex-1 p-8 bg-blue-100">
        <div className="bg-blue-200 rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-semibold text-blue-800 mb-6">
            Bem-vindo, {usuarioLogado?.nome || 'Usuário'}!
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-300 border border-blue-200 rounded-lg p-6">
              <h3 className="text-sm font-medium text-blue-700 mb-2">Total de Produtos</h3>
              <p className="text-2xl font-semibold text-blue-900">128</p>
            </div>
            <div className="bg-blue-300 border border-blue-200 rounded-lg p-6">
              <h3 className="text-sm font-medium text-blue-700 mb-2">Vendas do Mês</h3>
              <p className="text-2xl font-semibold text-blue-900">R$ 25.480</p>
            </div>
            <div className="bg-blue-300 border border-blue-200 rounded-lg p-6">
              <h3 className="text-sm font-medium text-blue-700 mb-2">Novos Clientes</h3>
              <p className="text-2xl font-semibold text-blue-900">34</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
