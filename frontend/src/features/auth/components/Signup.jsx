import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../authSlice";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(signupUser(formData)).unwrap();
      navigate("/home");
    } catch (err) {
      console.error("Signup failed:", err);
    }
  };

  return (
    <>
    <div className="tw:flex tw:justify-center tw:items-center tw:h-screen tw:bg-gray-100
    tw:flex-col">
      <div className="tw:bg-white tw:p-6 tw:rounded-lg tw:shadow-lg tw:w-96">
        <h2 className="tw:text-2xl tw:font-bold tw:text-gray-800 tw:mb-4 tw:text-center">Signup</h2>
        {error && <p className="tw:text-red-500 tw:text-sm tw:text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="tw:space-y-4">
          <input type="text" name="name" placeholder="Name" onChange={handleChange} required className="tw:w-full tw:p-2 tw:border tw:rounded-md tw:focus:ring-2 tw:focus:ring-blue-500
          " />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="
          tw:w-full tw:p-2 tw:border tw:rounded-md tw:focus:ring-2 tw:focus:ring-blue-500
          my-2" />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="tw:w-full 
            tw:px-4 tw:py-2 
            tw:border tw:rounded-lg 
            tw:focus:outline-none 
            tw:focus:ring-2 tw:focus:ring-blue-500
            my-2" />
          <button type="submit" 
          className="tw:w-full
           tw:bg-blue-500
            tw:text-white tw:p-2 tw:rounded-md tw:hover:bg-blue-600 tw:transition
            tw:my-10" disabled={status === "loading"}>
            {status === "loading" ? "Signing up..." : "Signup"}
          </button>
        </form>
      </div>
      <p className="tw:text-center tw:mt-4">
    Already have an account?{" "}
    <Link to="/login" className="tw:text-blue-600 tw:hover:underline">
      Login
    </Link>
  </p>
    </div>
   
    </>
  );
};

export default Signup;
