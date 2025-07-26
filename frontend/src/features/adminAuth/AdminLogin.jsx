import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "./adminAuthSlice";
import { Link } from "react-router-dom";

const AdminLogin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, error, admin } = useSelector((state) => state.adminAuth);
  console.log(admin);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(adminLogin(form));
  };

  useEffect(() => {
    if (admin) {
      navigate("/admin");
    }
  }, [admin, navigate]);

  return (
    <div className="tw:min-h-screen tw:flex tw:items-center tw:justify-center tw:bg-gray-100">
      <div className="tw:bg-white tw:p-8 tw:shadow-md tw:rounded-lg tw:w-full tw:max-w-md">
        <h2 className="tw:text-2xl tw:font-semibold tw:text-center tw:mb-6">Admin Login</h2>

        {error && <p className="tw:text-red-600 tw:text-center">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="tw:mb-4">
            <label className="tw:block">Email</label>
            <input
              type="email"
              name="email"
              className="tw:w-full tw:border tw:px-3 tw:py-2 tw:rounded"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="tw:mb-4">
            <label className="tw:block">Password</label>
            <input
              type="password"
              name="password"
              className="tw:w-full tw:border tw:px-3 tw:py-2 tw:rounded"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            disabled={status === "loading"}
            className="tw:w-full tw:bg-blue-600 tw:text-white tw:py-2 tw:rounded hover:tw:bg-blue-700"
          >
            {status === "loading" ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="tw:mt-3.5">

        <p className="tw:text-center"><Link to="/login">user login ?</Link></p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;