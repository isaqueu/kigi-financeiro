
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { servicoLogin } from '../service/LoginService';
import { useContextoGeral } from '../componentes/ContextoGeral';

export const Login: React.FC = () => {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const { setUsuario, setCarregando } = useContextoGeral();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setCarregando(true);

    try {
      const usuario = await servicoLogin.entrar(login, senha);
      setUsuario(usuario);
      navigate('/home');
    } catch (error: any) {
      setErro(error.response?.data?.message || 'Usuário ou senha inválidos');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Login"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          {erro && (
            <div className="bg-red-100 text-red-700 p-3 rounded">
              {erro}
            </div>
          )}

          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
