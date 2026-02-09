import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import AdminLayout from "./layouts/AdminLayout";
import ProtectedRoute from "./routes/ProtectedRoutes";
import MyProfile from "./pages/Profile/MyProfile";

function App() {
  return (
    <Routes>
      
      <Route path="/" element={<Login />} />

      {/* Protected Admin */}
      <Route
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/my-profile" element={<MyProfile />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
