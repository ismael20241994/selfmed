import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function PrivateRoute() {
   const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <h1>Verificando acesso...</h1>;
  }

  return isAuthenticated 
    ? <Outlet /> 
    : <Navigate to="/" replace />;
}
