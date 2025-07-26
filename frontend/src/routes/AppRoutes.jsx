


import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "../features/auth/components/Signup";
import LoginPage from "../pages/LoginPage";
import Home from "../pages/Home";
import ProfilePage from "../pages/ProfilePage";
import { useSelector } from "react-redux";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import AdminDashboard from "../features/admin/components/AdminDashboard";
import RequireAdmin from "../features/admin/protected/RequireAdmin";
import AdminLogin from "../features/adminAuth/AdminLogin";
import RequireOwner from "../features/owner/RequireOwner";
import OwnerDashboard from "../features/owner/components/OwnerDashboard";





const AppRoutes = () => {
  const user = useSelector((state) => state.auth.user);
  const admin = useSelector((state) => state.adminAuth.user);

  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={user ? "/home" : admin ? "/admin" : "/signup"} />}
      />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      
      {/* Protected user routes */}
      <Route path="/home" element={user ? <Home /> : <Navigate to="/login" />} />
      <Route path="/profile" element={user ? <ProfilePage /> : <Navigate to="/login" />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/resetpassword/:token" element={<ResetPasswordPage />} />

      {/* Protected admin route */}
      <Route
        path="/admin"
        element={
          <RequireAdmin>
            <AdminDashboard />
          </RequireAdmin>
        }
      />
      <Route
        path="/owner"
        element={
          <RequireOwner>
            <OwnerDashboard />
          </RequireOwner>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
