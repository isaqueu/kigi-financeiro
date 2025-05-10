import { LoginRequest, UsuarioLogado } from "../types";
import api from "./api";

// Serviço responsável pelas operações de autenticação
export const servicoLogin = {
    // Realiza o login do usuário
    entrar: async (dados: LoginRequest): Promise<UsuarioLogado> => {
        const resposta = await api.post("/login-controle-acesso", dados);
        return resposta.data;
    },

    // Realiza o logout do usuário
    sair: async (): Promise<void> => {
        // Implementar lógica de logout quando necessário
    },
};
