import LoginScreen from "@/components/login-screen";
import ProtectedRoute from "@/middlewares/protect-route";
import Home from "@/pages/Home";

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
                <Home />
            </ProtectedRoute>
        ),
    },
];