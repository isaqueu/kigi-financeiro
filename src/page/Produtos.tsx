
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
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Produtos</h1>
        {modo === "lista" ? (
          <Button onClick={() => setModo("form")}>Novo Produto</Button>
        ) : (
          <Button variant="outline" onClick={() => setModo("lista")}>Voltar</Button>
        )}
      </div>

      {modo === "lista" ? (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">QR Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Classificação</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unidade</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
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
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
          <div className="space-y-4">
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
