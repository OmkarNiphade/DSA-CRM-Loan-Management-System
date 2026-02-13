import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRole, allowedRoles }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const role = localStorage.getItem("role")?.toLowerCase();

  if (!isLoggedIn || !role) {
    return <Navigate to="/login" replace />;
  }

  const allowed = allowedRoles || (allowedRole ? [allowedRole] : undefined);

  if (allowed && !allowed.includes(role)) {
    if (role === "admin") return <Navigate to="/admin/dashboard" replace />;
    if (role === "operator") return <Navigate to="/operator/dashboard" replace />;
    if (role === "marketing") return <Navigate to="/marketing/dashboard" replace />;
    if (role === "bank") return <Navigate to="/bank-executive" replace />;
  }

  return children;
};

export default ProtectedRoute;
