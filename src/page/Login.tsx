
import React, { useState } from "react";
import { Button } from "../componentes/ui/button";
import { useNavigate } from "react-router-dom";
import { servicoLogin } from "../service/LoginService";
import { useContextoGeral } from "../componentes/contexto/ContextoGeral";
import { LoginRequest } from "@/types";

export const Login: React.FC = () => {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const { setUsuarioLogado, setCarregando } = useContextoGeral();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    setCarregando(true);

    const dados: LoginRequest = {
      usuarioLogin: login,
      senhaHash: senha,
      nomeAplicacao: "KIGI Finanças",
    };

    try {
      const usuario = await servicoLogin.entrar(dados);
      if (usuario) {
        setUsuarioLogado(usuario);
        navigate("/home");
      } else {
        setErro("Usuário ou senha inválidos");
      }
    } catch (error: any) {
      setErro(
        error.response?.data?.erro ||
          error.response?.data?.message ||
          "Erro ao tentar fazer login"
      );
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-300">
      <div className="w-full max-w-md space-y-8 p-8">
        <div className="bg-blue-300 bg-opacity-50 backdrop-blur-sm px-8 py-12 shadow-xl rounded-2xl border border-blue-200">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-blue-800 mb-2">
              KIGI Finanças
            </h1>
            <p className="text-blue-600">Gestão financeira inteligente</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="login"
                  className="block text-sm font-medium text-blue-700"
                >
                  Login
                </label>
                <input
                  id="login"
                  type="text"
                  required
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  className="mt-1 block w-full rounded-lg bg-blue-100 border border-blue-300 px-4 py-3 text-blue-900 placeholder-blue-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  placeholder="Digite seu login"
                />
              </div>
              <div>
                <label
                  htmlFor="senha"
                  className="block text-sm font-medium text-blue-700"
                >
                  Senha
                </label>
                <input
                  id="senha"
                  type="password"
                  required
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="mt-1 block w-full rounded-lg bg-blue-100 border border-blue-300 px-4 py-3 text-blue-900 placeholder-blue-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  placeholder="Digite sua senha"
                />
              </div>
            </div>

            {erro && (
              <div className="rounded-lg bg-red-100 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-red-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-500">{erro}</p>
                  </div>
                </div>
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-400 text-white py-3 rounded-lg transition-colors"
            >
              Entrar
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
