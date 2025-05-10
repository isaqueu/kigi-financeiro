
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="bg-white px-6 py-8 shadow-xl rounded-lg">
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
            Login
          </h2>
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="login" className="block text-sm font-medium text-gray-700">
                  Login
                </label>
                <input
                  id="login"
                  type="text"
                  required
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Digite seu login"
                />
              </div>
              <div>
                <label htmlFor="senha" className="block text-sm font-medium text-gray-700">
                  Senha
                </label>
                <input
                  id="senha"
                  type="password"
                  required
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Digite sua senha"
                />
              </div>
            </div>

            {erro && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{erro}</p>
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
