import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { LOGIN_ROUTE } from "../../../app/Routes";

export const ProtectedRoute = () => {
    const { isAuthenticated, loading } = useAuth()

    if (loading) {
        return null
    }

    return isAuthenticated ? <Outlet/> : <Navigate to={LOGIN_ROUTE} replace/>
};
