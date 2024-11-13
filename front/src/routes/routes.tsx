import LoginScreen from "@/components/login-screen";
import NotFoundScreen from "@/components/not-founded-screen";
import ProtectedRoute from "@/middlewares/protect-route";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import { Navigate } from "react-router-dom";

export const publicRoutes = [
    {
        path: "*",
        element: <NotFoundScreen />
    },
    {
        path: "/", 
        element: <Navigate to="/auth/login" replace />,
    },
    { 
        path: "/auth/login", 
        element: <LoginScreen /> 
    },
];

export const protectedRoutes = [
    {
        path: "/home",
        element: (
            // <ProtectedRoute>
                <Home />
            // </ProtectedRoute>
        ),
    },
    {
        path: "/services",
        element: (
            <ProtectedRoute>
                <Services />
            </ProtectedRoute>
        )
    }
];