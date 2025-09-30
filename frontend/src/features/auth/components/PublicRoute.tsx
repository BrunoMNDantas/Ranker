import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { APP_RANKS_ROUTE } from "../../../app/Routes";

export const PublicRoute = () => {
    const { isAuthenticated, loading } = useAuth()

    if (loading) {
        return null
    }

    return isAuthenticated ? <Navigate to={APP_RANKS_ROUTE} replace/> : <Outlet/>
};