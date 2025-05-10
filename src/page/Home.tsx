
import React from 'react';
import { useContextoGeral } from '../componentes/ContextoGeral';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Home: React.FC = () => {
  const { usuario } = useContextoGeral();

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl">
              Bem-vindo, {usuario?.nome}!
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Informações do Usuário</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Email: {usuario?.email}</p>
                  <p>Perfil: {usuario?.perfil}</p>
                </CardContent>
              </Card>
              {/* Adicione mais cards conforme necessário */}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;
