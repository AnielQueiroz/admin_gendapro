import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

export const useAuth = () => {
    // Obtém o estado de autenticação e os dados do usuário
    const isAuthenticated = useSelector(
        (state: RootState) => state.auth.isAuthenticated
    );
    const employee = useSelector((state: RootState) => state.auth.employee);

    return { isAuthenticated, employee };
}