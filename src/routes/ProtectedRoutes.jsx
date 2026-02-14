// import { Navigate } from "react-router-dom";
// import { isAuthenticated } from "../services/auth";

// const ProtectedRoute = ({ children }) => {
//   if (!isAuthenticated()) {
//     return <Navigate to="/" replace />;
//   }
//   return children;
// };

// export default ProtectedRoute;


import { Navigate, useLocation } from "react-router-dom";
import { isAuthenticated } from "../services/auth";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  // 🔐 Not logged in
  if (!isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  // 🔥 If password not changed
  if (user?.defaultPassword === 0) {
    if (location.pathname !== "/change-password") {
      return <Navigate to="/change-password" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;

