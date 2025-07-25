import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminHome from "./AdminHome";
import AdminUsers from "./AdminUsers";
import AdminStores from "./AdminStores";
import AddStoreForm from "./AddStoreForm";

import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [tab, setTab] = useState("home");
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  

  if (!user || user.role !== "ADMIN") {
    return <div className="tw:text-center tw:text-red-600 tw:mt-10">Access Denied</div>;
  }

  return (
    <div className="tw:container tw:mx-auto tw:px-4 tw:py-6">
      <h1 className="tw:text-2xl tw:font-bold tw:text-center">Admin Dashboard</h1>

      <div className="tw:flex tw:gap-3 tw:justify-center tw:flex-wrap tw:my-6">
        <button
          className={`tw:px-4 tw:py-2 tw:rounded ${
            tab === "home" ? "tw:bg-blue-600 tw:text-white" : "tw:bg-gray-200"
          }`}
          onClick={() => setTab("home")}
        >
          🏠 Home
        </button>
        <button
          className={`tw:px-4 tw:py-2 tw:rounded ${
            tab === "users" ? "tw:bg-blue-600 tw:text-white" : "tw:bg-gray-200"
          }`}
          onClick={() => setTab("users")}
        >
          👤 All Users
        </button>
        <button
          className={`tw:px-4 tw:py-2 tw:rounded ${
            tab === "stores" ? "tw:bg-blue-600 tw:text-white" : "tw:bg-gray-200"
          }`}
          onClick={() => setTab("stores")}
        >
          🏬 All Stores
        </button>
        <button
          className={`tw:px-4 tw:py-2 tw:rounded ${
            tab === "add" ? "tw:bg-blue-600 tw:text-white" : "tw:bg-gray-200"
          }`}
          onClick={() => setTab("add")}
        >
          ➕ Add Store
        </button>
      </div>

      <div>
        {tab === "home" && <AdminHome />}
        {tab === "users" && <AdminUsers />}
        {tab === "stores" && <AdminStores />}
        {tab === "add" && <AddStoreForm />}
      </div>
      
    </div>
  );
};

export default AdminDashboard;