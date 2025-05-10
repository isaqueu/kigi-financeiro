
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useContextoGeral } from '../componentes/contexto/ContextoGeral';

const Home: React.FC = () => {
  const { usuarioLogado } = useContextoGeral();
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Menu Lateral */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">KIGI Finanças</h2>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => navigate('/home')}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Dashboard
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate('/produtos')}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Produtos
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Conteúdo Principal */}
      <div className="flex-1 p-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Bem-vindo!</h1>
          <p className="text-gray-600">Olá, {usuarioLogado?.nome || 'Usuário'}!</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
