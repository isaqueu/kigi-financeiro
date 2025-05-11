
import React, { useState, useEffect } from "react";
import { servicoProduto } from "../service/ProdutoService";
import { Produto } from "../types";
import { Button } from "../componentes/ui/button";

const Produtos: React.FC = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [produtoAtual, setProdutoAtual] = useState<Produto>({
    nmProduto: "",
    qrcode: "",
    classificacao: "",
    unidade: "",
  });
  const [modo, setModo] = useState<"lista" | "form">("lista");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    carregarProdutos();
  }, []);

  const carregarProdutos = async () => {
    try {
      setLoading(true);
      const data = await servicoProduto.listarTodos();
      setProdutos(data);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (produtoAtual.idKigProduto) {
        await servicoProduto.editar(produtoAtual.idKigProduto, produtoAtual);
      } else {
        await servicoProduto.salvar(produtoAtual);
      }
      await carregarProdutos();
      setModo("lista");
      setProdutoAtual({ nmProduto: "", qrcode: "", classificacao: "", unidade: "" });
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-gradient-to-br from-kigi-light to-white min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-kigi-primary">Produtos</h1>
        {modo === "lista" ? (
          <Button 
            onClick={() => setModo("form")}
            className="bg-gradient-to-r from-kigi-primary to-kigi-secondary text-white hover:shadow-lg transition-all duration-200"
          >
            <span className="material-icons mr-2">add</span>
            Novo Produto
          </Button>
        ) : (
          <Button 
            variant="outline" 
            onClick={() => setModo("lista")}
            className="border-kigi-primary text-kigi-primary hover:bg-kigi-primary hover:text-white"
          >
            <span className="material-icons mr-2">arrow_back</span>
            Voltar
          </Button>
        )}
      </div>

      {modo === "lista" ? (
        <div className="bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl overflow-hidden border border-white">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-kigi-primary to-kigi-secondary text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold tracking-wider">Nome</th>
                <th className="px-6 py-4 text-left text-sm font-semibold tracking-wider">QR Code</th>
                <th className="px-6 py-4 text-left text-sm font-semibold tracking-wider">Classificação</th>
                <th className="px-6 py-4 text-left text-sm font-semibold tracking-wider">Unidade</th>
                <th className="px-6 py-4 text-right text-sm font-semibold tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {produtos.map((produto) => (
                <tr key={produto.idKigProduto}>
                  <td className="px-6 py-4 whitespace-nowrap">{produto.nmProduto}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{produto.qrcode}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{produto.classificacao}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{produto.unidade}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setProdutoAtual(produto);
                        setModo("form");
                      }}
                    >
                      Editar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl p-8 border border-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nome do Produto</label>
              <input
                type="text"
                value={produtoAtual.nmProduto}
                onChange={(e) => setProdutoAtual({ ...produtoAtual, nmProduto: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-kigi-accent focus:ring focus:ring-kigi-accent focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">QR Code</label>
              <input
                type="text"
                value={produtoAtual.qrcode}
                onChange={(e) => setProdutoAtual({ ...produtoAtual, qrcode: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-kigi-accent focus:ring focus:ring-kigi-accent focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Classificação</label>
              <input
                type="text"
                value={produtoAtual.classificacao}
                onChange={(e) => setProdutoAtual({ ...produtoAtual, classificacao: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-kigi-accent focus:ring focus:ring-kigi-accent focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Unidade</label>
              <input
                type="text"
                value={produtoAtual.unidade}
                onChange={(e) => setProdutoAtual({ ...produtoAtual, unidade: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-kigi-accent focus:ring focus:ring-kigi-accent focus:ring-opacity-50"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button type="submit" disabled={loading}>
                {loading ? "Salvando..." : "Salvar"}
              </Button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default Produtos;
