
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useContextoGeral } from '../componentes/contexto/ContextoGeral';
import { Button } from '../componentes/ui/button';

const Home: React.FC = () => {
  const { usuarioLogado } = useContextoGeral();
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Menu Lateral */}
      <div className="w-64 bg-white border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-blue-600">KIGI Finanças</h2>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => navigate('/home')}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-md transition-all duration-200 flex items-center space-x-3"
              >
                <span className="material-icons text-blue-600">dashboard</span>
                <span>Dashboard</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate('/produtos')}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-md transition-all duration-200 flex items-center space-x-3"
              >
                <span className="material-icons text-blue-600">inventory_2</span>
                <span>Produtos</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Conteúdo Principal */}
      <div className="flex-1 p-8 bg-gray-50">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">
            Bem-vindo, {usuarioLogado?.nome || 'Usuário'}!
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Total de Produtos</h3>
              <p className="text-2xl font-semibold text-gray-800">128</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Vendas do Mês</h3>
              <p className="text-2xl font-semibold text-gray-800">R$ 25.480</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Novos Clientes</h3>
              <p className="text-2xl font-semibold text-gray-800">34</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
