import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "../features/auth/components/Signup";
import LoginPage from "../pages/LoginPage";
import Home from "../pages/Home";
import ProfilePage from "../pages/ProfilePage";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signup" />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  );
};

export default AppRoutes;
