
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import './index.css'
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { ToastContainer } from 'react-toastify'
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <>
    <ToastContainer/>
      <Router>
        <AppRoutes/>
      </Router>
    </>
  )
}

export default App
