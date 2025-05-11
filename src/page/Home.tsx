
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useContextoGeral } from '../componentes/contexto/ContextoGeral';

const Home: React.FC = () => {
  const { usuarioLogado } = useContextoGeral();
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-kigi-background">
      {/* Menu Lateral */}
      <div className="w-64 bg-gradient-to-b from-kigi-darkBlue to-kigi-mediumBlue text-white">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-2xl font-bold">KIGI Finanças</h2>
        </div>
        <nav className="p-4">
          <ul className="space-y-3">
            <li>
              <button
                onClick={() => navigate('/home')}
                className="w-full text-left px-4 py-3 text-white hover:bg-white/10 rounded-lg transition-all duration-200 flex items-center space-x-3"
              >
                <span className="material-icons">dashboard</span>
                <span>Dashboard</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate('/produtos')}
                className="w-full text-left px-4 py-3 text-white hover:bg-white/10 rounded-lg transition-all duration-200 flex items-center space-x-3"
              >
                <span className="material-icons">inventory_2</span>
                <span>Produtos</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Conteúdo Principal */}
      <div className="flex-1 p-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-white">
          <h1 className="text-3xl font-bold text-kigi-primary mb-6">Bem-vindo!</h1>
          <p className="text-xl text-kigi-secondary">
            Olá, <span className="font-semibold">{usuarioLogado?.nome || 'Usuário'}</span>!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <div className="bg-gradient-to-br from-kigi-primary to-kigi-secondary p-6 rounded-xl text-white">
              <h3 className="text-lg font-semibold mb-2">Total de Produtos</h3>
              <p className="text-3xl font-bold">128</p>
            </div>
            <div className="bg-gradient-to-br from-kigi-secondary to-kigi-accent p-6 rounded-xl text-white">
              <h3 className="text-lg font-semibold mb-2">Vendas do Mês</h3>
              <p className="text-3xl font-bold">R$ 25.480</p>
            </div>
            <div className="bg-gradient-to-br from-kigi-accent to-kigi-primary p-6 rounded-xl text-white">
              <h3 className="text-lg font-semibold mb-2">Novos Clientes</h3>
              <p className="text-3xl font-bold">34</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
