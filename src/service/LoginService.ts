import { Usuario } from "../types";
import api from "./api";

export const loginService = {
    logar: async (login: string, senha: string): Promise<Usuario> => {
        const response = await api.post('/login', { login, senha });
        return response.data;
    },

    logout: async (): Promise<void> => {
        // Implemente a lógica de logout, se necessário
    },
};