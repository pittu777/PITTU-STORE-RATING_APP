


import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../authSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const loginSchema = z.object({
  email: z.string()
    .min(1, "Email is required")
    .email("Invalid email format"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .max(16, "Password must be at most 16 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character")
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status } = useSelector((state) => state.auth);

  // Initialize react-hook-form with Zod resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = async (data) => {
    try {
      await dispatch(loginUser(data)).unwrap();
      navigate("/home");
    } catch (err) {
      toast.error(err || "Login failed");
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="tw:flex tw:flex-col tw:items-center tw:justify-center tw:min-h-screen tw:bg-gray-100">
      <div className="tw:w-full tw:max-w-md tw:p-6 tw:bg-white tw:shadow-md tw:rounded-lg">
        <h2 className="tw:text-2xl tw:font-semibold tw:text-center tw:mb-4">
          Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="tw:space-y-4" noValidate>
          <div>
            <input
              type="email"
              id="email"
              placeholder="Email"
              {...register("email")}
              className={`tw:w-full tw:px-4 tw:py-2 tw:border tw:rounded-lg tw:focus:outline-none tw:focus:ring-2 tw:focus:ring-blue-500 my-2 ${
                errors.email ? "tw:border-red-500" : ""
              }`}
            />
            {errors.email && (
              <p className="tw:text-red-500 tw:text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="password"
              id="password"
              placeholder="Password"
              {...register("password")}
              className={`tw:w-full tw:px-4 tw:py-2 tw:border tw:rounded-lg tw:focus:outline-none tw:focus:ring-2 tw:focus:ring-blue-500 ${
                errors.password ? "tw:border-red-500" : ""
              }`}
            />
            {errors.password && (
              <p className="tw:text-red-500 tw:text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="my-2 tw:w-full tw:py-2 tw:text-white tw:bg-green-500 tw:hover:bg-green-700 tw:rounded-lg tw:flex tw:items-center tw:justify-center disabled:tw:opacity-70"
          >
            {status === "loading" ? (
              <svg
                className="tw:animate-spin tw:h-5 tw:w-5 tw:text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="tw:opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="tw:opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <p className="tw:text-center tw:mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="tw:text-blue-600 tw:hover:underline">
            Sign Up
          </Link>
        </p>
        <p className="tw:text-center tw:mt-4">
          <Link
            to="/forgot-password"
            className="tw:text-blue-600 tw:hover:underline"
          >
            Forgot Password
          </Link>
        </p>
        <p className="tw:text-center">
          <Link
            to="/admin-login"
            className="tw:text-blue-600 tw:hover:underline"
          >
            Admin Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;