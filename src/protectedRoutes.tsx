import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./context/authContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const token = localStorage.getItem("authToken");
  const { activeUser } = useAuth();
  const userRole = activeUser?.role;

  // useEffect(() => {}, [activeUser?.role]);

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/register" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
