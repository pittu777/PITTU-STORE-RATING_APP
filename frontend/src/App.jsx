
import { BrowserRouter as Router } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import './index.css'
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { ToastContainer } from 'react-toastify'
import AppRoutes from "./routes/AppRoutes";
import useAuthExpiration from "./hooks/useAuthExpiration";

function App() {
  return (
    <>
    <ToastContainer/>
      <Router>
      <AuthExpirationHandler/>;
        <AppRoutes/>
      </Router>
    </>
  )
}

const AuthExpirationHandler = () => {
  useAuthExpiration();
  return null; // It doesn't render anything
};

export default App
