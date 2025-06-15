import { Navigate } from "react-router";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("user");
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
