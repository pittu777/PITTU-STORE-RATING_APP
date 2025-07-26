import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const RequireAdmin = ({ children }) => {
  const {admin} = useSelector((state) => state.adminAuth);

  console.log("requ", admin);

  if (!admin || admin.role !== "ADMIN") {
    return <Navigate to="/admin-login"/>;
  }

  return children;
};

export default RequireAdmin;
