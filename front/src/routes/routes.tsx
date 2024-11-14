import LoginScreen from "@/components/login-screen";
import NotFoundScreen from "@/components/not-founded-screen";
import ProtectedRoute from "@/middlewares/protect-route";
import Clients from "@/pages/Clients";
import Employees from "@/pages/Employess";
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
            <ProtectedRoute>
                <Home />
            </ProtectedRoute>
        ),
    },
    {
        path: "/services",
        element: (
            <ProtectedRoute>
                <Services />
            </ProtectedRoute>
        )
    },
    {
        path: "/admin/employees",
        element: (
            <ProtectedRoute>
                <Employees />
            </ProtectedRoute>
        )
    },
    {
        path: "/operational/clients",
        element: (
            <ProtectedRoute>
                <Clients />
            </ProtectedRoute>
        )
    }
];