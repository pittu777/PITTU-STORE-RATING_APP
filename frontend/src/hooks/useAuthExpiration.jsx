import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";
import { toast } from "react-toastify"; // Import Toast

const useAuthExpiration = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const expiresAt = localStorage.getItem("expiresAt");

        if (!expiresAt) return;

        const remainingTime = Number(expiresAt) - new Date().getTime();

        if (remainingTime <= 0) {
            dispatch(logout());
            toast.warning("Session expired. Please log in again."); // Show Toast
            navigate("/login");
        } else {
            const timeout = setTimeout(() => {
                dispatch(logout());
                toast.warning("Session expired. Please log in again."); // Show Toast
                navigate("/login");
            }, remainingTime);

            return () => clearTimeout(timeout); // Cleanup timeout
        }
    }, [dispatch, navigate]);

};

export default useAuthExpiration;
