import React, { useState } from "react";
import { Button } from "../componentes/ui/button";
import { useNavigate } from "react-router-dom";
import { servicoLogin } from "../service/LoginService";
import { useContextoGeral } from "../componentes/contexto/ContextoGeral";
import { LoginRequest, UsuarioLogado } from "@/types";

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

    console.log("Login:", login);

    const dados: LoginRequest = {
      usuarioLogin: login,
      senhaHash: senha,
      nomeAplicacao: "KIGI Finanças",
    };

    try {
      const usuario = await servicoLogin.entrar(dados);
      setUsuarioLogado(usuario);
      navigate("/home");
    } catch (error: any) {
      setErro(error.response?.data?.message || "Usuário ou senha inválidos");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-kigi-primary to-kigi-secondary">
      <div className="w-full max-w-md space-y-8 p-8">
        <div className="bg-kigi-light/90 backdrop-blur-sm px-8 py-12 shadow-lg rounded-2xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-kigi-primary mb-2">
              KIGI Finanças
            </h1>
            <p className="text-gray-600">Gestão financeira inteligente</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="login"
                  className="block text-sm font-medium text-gray-700"
                >
                  Login
                </label>
                <input
                  id="login"
                  type="text"
                  required
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:border-kigi-accent focus:ring-1 focus:ring-kigi-accent transition-colors"
                  placeholder="Digite seu login"
                />
              </div>
              <div>
                <label
                  htmlFor="senha"
                  className="block text-sm font-medium text-gray-700"
                >
                  Senha
                </label>
                <input
                  id="senha"
                  type="password"
                  required
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:border-kigi-accent focus:ring-1 focus:ring-kigi-accent transition-colors"
                  placeholder="Digite sua senha"
                />
              </div>
            </div>

            {erro && (
              <div className="rounded-lg bg-red-50 p-4">
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
                    <p className="text-sm text-red-700">{erro}</p>
                  </div>
                </div>
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-kigi-primary hover:bg-kigi-secondary text-white py-3 rounded-lg transition-colors"
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
