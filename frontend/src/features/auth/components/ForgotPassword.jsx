import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../authSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      dispatch(forgotPassword(email)).unwrap();
      toast.success(
        "A password reset link has been sent. Please check your inbox.",
        {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
    } catch (error) {
      toast.error(err);
      console.error("Password reset failed", err);
    }
  };

  return (
    <div className="tw:flex tw:flex-col tw:items-center tw:justify-center tw:min-h-screen tw:bg-gray-100">
      <div className="tw:w-full tw:max-w-md tw:p-6 tw:bg-white tw:shadow-md tw:rounded-lg">
        <h2 className="tw:text-2xl tw:font-semibold tw:text-center tw:mb-4">
          Forgot Password
        </h2>

        <form onSubmit={handleSubmit} className="tw:space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="tw:w-full tw:px-4 tw:py-2 tw:border tw:rounded-lg tw:focus:outline-none tw:focus:ring-2 tw:focus:ring-blue-500 my-2"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="my-2 tw:w-full tw:py-2 tw:text-white tw:bg-blue-600 tw:hover:bg-blue-700 tw:rounded-lg tw:flex tw:items-center tw:justify-center"
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
                <circle
                  className="tw:opacity-75 tw:text-white"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="white"
                  strokeWidth="4"
                  strokeDasharray="31.4 31.4"
                  strokeLinecap="round"
                ></circle>
              </svg>
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
