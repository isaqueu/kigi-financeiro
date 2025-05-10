
import { Produto } from "../types";
import api from "./api";

export const servicoProduto = {
  salvar: async (produto: Produto): Promise<Produto> => {
    const resposta = await api.post("/kigi-produto", produto);
    return resposta.data;
  },

  editar: async (id: number, produto: Produto): Promise<Produto> => {
    const resposta = await api.put(`/kigi-produto/${id}`, produto);
    return resposta.data;
  },

  listarTodos: async (): Promise<Produto[]> => {
    const resposta = await api.get("/kigi-produto");
    return resposta.data;
  },

  buscarPorId: async (id: number): Promise<Produto> => {
    const resposta = await api.get(`/kigi-produto/${id}`);
    return resposta.data;
  },

  buscarPorQRCode: async (qrcode: string): Promise<Produto> => {
    const resposta = await api.get(`/kigi-produto/qrcode/${qrcode}`);
    return resposta.data;
  },
};
