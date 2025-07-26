
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const RequireOwner = ({ children }) => {
  const {user} = useSelector((state) => state.auth);

  console.log("requ", user);

  if (!user || user.role !== "OWNER") {
    return <Navigate to="/login"/>;
  }

  return children;
};

export default RequireOwner;
