import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import AdminLayout from "./layouts/AdminLayout";
import ProtectedRoute from "./routes/ProtectedRoutes";
import MyProfile from "./pages/Profile/MyProfile";
import Retailers from "./pages/Retailers/Retailers";
import RetailerDetails from "./pages/Retailers/RetailerDetails";
import Module from "./pages/Module/Module";
import Subscriptions from "./pages/Subscriptions/Subscriptions";
import Customers from "./pages/Customers/Customers";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
    
      <Route
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/retailers" element={<Retailers />} />
        <Route path="/retailer-details" element={<RetailerDetails />} />
        <Route path="/module" element={<Module />} />
        <Route path="/subscriptions" element={<Subscriptions />} />
        <Route path="/users" element={<Customers />} />
      </Route>
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
