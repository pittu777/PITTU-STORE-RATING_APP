import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "../features/auth/components/Signup";
import LoginPage from "../pages/LoginPage";
import Home from "../pages/Home";
import ProfilePage from "../pages/ProfilePage";
import { useSelector } from "react-redux";


const AppRoutes = () => {
  const user = useSelector((state)=>state.auth.user);
  
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signup" />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/home" element={!user?<LoginPage/>:<Home />} />
      <Route path="/profile" element={!user?<LoginPage/>:<ProfilePage />} />
    </Routes>
  );
};

export default AppRoutes;
