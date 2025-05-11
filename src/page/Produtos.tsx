
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
    <div className="p-8 bg-slate-900 min-h-screen">
      <div className="bg-slate-800 rounded-lg shadow-lg">
        <div className="p-6 border-b border-slate-700 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-emerald-400">Produtos</h1>
          {modo === "lista" ? (
            <Button
              onClick={() => setModo("form")}
              className="bg-emerald-600 text-white hover:bg-emerald-700 px-4 py-2 rounded-md flex items-center space-x-2"
            >
              <span className="material-icons text-sm">add</span>
              <span>Novo Produto</span>
            </Button>
          ) : (
            <Button
              onClick={() => setModo("lista")}
              className="text-emerald-400 hover:text-emerald-300 px-4 py-2 rounded-md flex items-center space-x-2"
            >
              <span className="material-icons text-sm">arrow_back</span>
              <span>Voltar</span>
            </Button>
          )}
        </div>

        {modo === "lista" ? (
          <div className="p-6">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-emerald-400 border-b border-slate-700">
                  <th className="pb-3">Nome</th>
                  <th className="pb-3">QR Code</th>
                  <th className="pb-3">Classificação</th>
                  <th className="pb-3">Unidade</th>
                  <th className="pb-3"></th>
                </tr>
              </thead>
              <tbody>
                {produtos.map((produto) => (
                  <tr key={produto.idKigProduto} className="border-b border-slate-700">
                    <td className="py-3 text-slate-300">{produto.nmProduto}</td>
                    <td className="py-3 text-slate-300">{produto.qrcode}</td>
                    <td className="py-3 text-slate-300">{produto.classificacao}</td>
                    <td className="py-3 text-slate-300">{produto.unidade}</td>
                    <td className="py-3 text-right">
                      <Button
                        onClick={() => {
                          setProdutoAtual(produto);
                          setModo("form");
                        }}
                        className="text-emerald-400 hover:text-emerald-300"
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
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-emerald-400 mb-1">
                  Nome do Produto
                </label>
                <input
                  type="text"
                  value={produtoAtual.nmProduto}
                  onChange={(e) => setProdutoAtual({ ...produtoAtual, nmProduto: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 text-white rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-emerald-400 mb-1">
                  QR Code
                </label>
                <input
                  type="text"
                  value={produtoAtual.qrcode}
                  onChange={(e) => setProdutoAtual({ ...produtoAtual, qrcode: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 text-white rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-emerald-400 mb-1">
                  Classificação
                </label>
                <input
                  type="text"
                  value={produtoAtual.classificacao}
                  onChange={(e) => setProdutoAtual({ ...produtoAtual, classificacao: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 text-white rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-emerald-400 mb-1">
                  Unidade
                </label>
                <input
                  type="text"
                  value={produtoAtual.unidade}
                  onChange={(e) => setProdutoAtual({ ...produtoAtual, unidade: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 text-white rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                type="submit"
                className="bg-emerald-600 text-white hover:bg-emerald-700 px-6 py-2 rounded-md"
                disabled={loading}
              >
                {loading ? "Salvando..." : "Salvar"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Produtos;
