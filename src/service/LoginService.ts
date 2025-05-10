
import { Usuario } from "../types";
import api from "./api";

// Serviço responsável pelas operações de autenticação
export const servicoLogin = {
    // Realiza o login do usuário
    entrar: async (login: string, senha: string): Promise<Usuario> => {
        const resposta = await api.post('/login', { login, senha });
        return resposta.data;
    },

    // Realiza o logout do usuário
    sair: async (): Promise<void> => {
        // Implementar lógica de logout quando necessário
    },
};
