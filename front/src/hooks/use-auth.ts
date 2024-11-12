import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

export const useAuth = () => {
    // Obtém o estado de autenticação e os dados do usuário
    const isAuthenticated = useSelector(
        (state: RootState) => state.auth.isAuthenticated
    );
    const user = useSelector((state: RootState) => state.auth.user);

    return { isAuthenticated, user};
}