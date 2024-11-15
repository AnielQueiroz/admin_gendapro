import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Role {
    id: string;
    name: string;
    permissions: {
        name: string
    }[];
}

interface Employee {
    id: string;
    name: string;
    email: string;
    barbershop: {
        id: string;
        name: string;
    }
    role: Role
}

interface AuthState {
    employee: Employee | null
    token: string;
    isAuthenticated: boolean;
}

// Verifica no localStorage ao iniciar
const persistedEmployee = localStorage.getItem("auth");
const initialStateFromStorage = persistedEmployee ? JSON.parse(persistedEmployee) : null;

const initialState: AuthState = {
    employee: initialStateFromStorage?.employee || null,
    token: initialStateFromStorage?.token || "",
    isAuthenticated: !!initialStateFromStorage?.token,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state, action: PayloadAction<{ employee: Employee, token: string }>) {
            const { employee, token } = action.payload;
            state.employee = employee;
            state.token = token;
            state.isAuthenticated = true;

            // Persistir no localStorage
            localStorage.setItem(
                "auth",
                JSON.stringify({ employee, token })
            );
        },
        logout(state) {
            state.employee = null;
            state.token = "";
            state.isAuthenticated = false;

            // Remover do localStorage
            localStorage.removeItem("auth");
        }
    }
})

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;