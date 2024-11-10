import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import type { RootState } from "@/store/store";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Você precisa estar logado para acessar essa página.");
    }
  }, [isAuthenticated]); // Verifica mudanças no estado de autenticação

  if (!isAuthenticated) {
    // Retorna um Navigate apenas depois de exibir o toast
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
