import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  if (!accessToken || !refreshToken) {
    return <Navigate to="/signin"></Navigate>;
  }

  return children;
}

export default ProtectedRoute;
