import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    user: {
        name: string | null;
        token: string | null;
        permissions: string[]
    } | null;
    isAuthenticated: boolean;
}

// Verifica no localStorage ao iniciar
const persistedUser = localStorage.getItem("auth");
const initialStateFromStorage = persistedUser ? JSON.parse(persistedUser) : null;

const initialState: AuthState = {
    user: initialStateFromStorage || null,
    isAuthenticated: initialStateFromStorage ? true : false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state, action: PayloadAction<{ name: string; token: string; permissions: string[] }>) {
            state.user = {
                name: action.payload.name,
                token: action.payload.token,
                permissions: action.payload.permissions
            }
            state.isAuthenticated = true;
        },
        logout(state) {
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem("auth");
        }
    }
})

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;