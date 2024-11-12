import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    user: {
        email: string | null;
        token: string | null;
    } | null;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state, action: PayloadAction<{ email: string; token: string }>) {
            state.user = {
                email: action.payload.email,
                token: action.payload.token
            }
            state.isAuthenticated = true;
        },
        logout(state) {
            state.user = null;
            state.isAuthenticated = false;
        }
    }
})

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;