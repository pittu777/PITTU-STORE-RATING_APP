

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../authSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const signupSchema = z.object({
  name: z.string()
    .min(5, "Name must be at least 5 characters")
    .max(60, "Name must be at most 60 characters"),
  email: z.string()
    .min(1, "Email is required")
    .email("Invalid email format"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .max(16, "Password must be at most 16 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[^A-Za-z0-9]/, "Must contain at least one special character")
});

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: ""
    }
  });

  const onSubmit = async (data) => {
    try {
      await dispatch(signupUser(data)).unwrap();
      toast.success("Signup successful!");
      navigate("/home");
    } catch (err) {
      toast.error(err || "Signup failed");
      console.error("Signup failed:", err);
    }
  };

  return (
    <div className="tw:flex tw:justify-center tw:items-center tw:h-screen tw:bg-gray-100 tw:flex-col">
      <div className="tw:bg-white tw:p-6 tw:rounded-lg tw:shadow-lg tw:w-96">
        <h2 className="tw:text-2xl tw:font-bold tw:text-gray-800 tw:mb-4 tw:text-center">
          Signup
        </h2>
        
        {error && <p className="tw:text-red-500 tw:text-sm tw:text-center">{error}</p>}
        
        <form onSubmit={handleSubmit(onSubmit)} className="tw:space-y-4">
          <div>
            <input
              type="text"
              id="name"
              placeholder="Full Name (5-60 characters)"
              {...register("name")}
              className={`tw:w-full tw:p-2 tw:border tw:rounded-md tw:focus:ring-2 tw:focus:ring-blue-500 ${
                errors.name ? "tw:border-red-500" : ""
              }`}
            />
            {errors.name && (
              <p className="tw:text-red-500 tw:text-sm tw:mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="email"
              id="email"
              placeholder="Email"
              {...register("email")}
              className={`tw:w-full tw:p-2 tw:border tw:rounded-md tw:focus:ring-2 tw:focus:ring-blue-500 ${
                errors.email ? "tw:border-red-500" : ""
              }`}
            />
            {errors.email && (
              <p className="tw:text-red-500 tw:text-sm tw:mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="password"
              id="password"
              placeholder="Password (8-16 chars with special characters)"
              {...register("password")}
              className={`tw:w-full tw:p-2 tw:border tw:rounded-md tw:focus:ring-2 tw:focus:ring-blue-500 ${
                errors.password ? "tw:border-red-500" : ""
              }`}
            />
            {errors.password && (
              <p className="tw:text-red-500 tw:text-sm tw:mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="tw:w-full tw:bg-green-500 tw:text-white tw:p-2 tw:rounded-md tw:hover:bg-green-600 tw:transition tw:my-4"
          >
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
  );
};

export default Signup;