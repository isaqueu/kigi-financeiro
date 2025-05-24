import React from "react";
import { useNavigate } from "react-router-dom";
import { useContextoGeral } from "./contexto/ContextoGeral";
import { Button } from "./ui/button";

const Header: React.FC = () => {
  const { usuarioLogado } = useContextoGeral();
  const navigate = useNavigate();

  return (
    <header className="bg-blue-300 border-b border-blue-200">
      <div className="flex justify-between items-center px-6 py-4">
        <h2 className="text-xl font-semibold text-blue-800">KIGI Finanças</h2>
        <div className="flex items-center space-x-4">
          <span className="text-blue-700">{usuarioLogado?.nome}</span>
          <Button
            onClick={() => navigate("/home")}
            className="bg-kigi-mediumBlue text-white hover:bg-kigi-hoverBlue px-3 py-1 rounded-md transition-all duration-200"
          >
            Dashboard
          </Button>
          <Button
            onClick={() => navigate("/produtos")}
            className="bg-kigi-mediumBlue text-white hover:bg-kigi-hoverBlue px-3 py-1 rounded-md transition-all duration-200"
          >
            Produtos
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
