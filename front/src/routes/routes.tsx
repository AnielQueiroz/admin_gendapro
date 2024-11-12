import LoginScreen from "@/components/login-screen";
import ProtectedRoute from "@/middlewares/protect-route";

export const publicRoutes = [
    { 
        path: "/", 
        element: <LoginScreen /> 
    },
];

export const protectedRoutes = [
    {
        path: "/home",
        element: (
            <ProtectedRoute>
                <h1>Home</h1>
            </ProtectedRoute>
        ),
    },
];