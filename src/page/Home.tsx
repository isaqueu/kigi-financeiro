
import React from 'react';
import { useContextoGeral } from '../componentes/ContextoGeral';

const Home: React.FC = () => {
  const { usuario } = useContextoGeral();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Bem-vindo, {usuario?.nome}!</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl mb-4">Suas informações:</h2>
        <div className="space-y-2">
          <p><strong>ID:</strong> {usuario?.idUsuario}</p>
          <p><strong>Login:</strong> {usuario?.login}</p>
          <p><strong>Nível:</strong> {usuario?.nivel.descricao}</p>
          <p><strong>Papéis:</strong></p>
          <ul className="list-disc pl-5">
            {usuario?.papeis.map(papel => (
              <li key={papel.idPapel}>{papel.nome}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
