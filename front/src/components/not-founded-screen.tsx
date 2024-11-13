import React from "react";
import { Link } from "react-router-dom";

const NotFoundScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="text-center max-w-xs">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          404 - Página Não Encontrada
        </h1>
        <p className="text-gray-600 mt-4">
          A página que você está tentando acessar não existe.
        </p>
        <Link
          to="/auth/login"
          className="mt-6 text-blue-500 hover:underline text-lg"
        >
          Voltar para o Login
        </Link>
      </div>
    </div>
  );
};

export default NotFoundScreen;
