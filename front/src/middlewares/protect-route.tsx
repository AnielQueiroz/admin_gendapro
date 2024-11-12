import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks/use-auth";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  // const [showRedirect, setShowRedirect] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Você precisa estar logado para acessar essa página.");
      // const timeoutId = setTimeout(() => setShowRedirect(true), 1000);

      // return () => clearTimeout(timeoutId);
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
