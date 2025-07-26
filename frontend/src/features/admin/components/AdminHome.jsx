import { useDispatch } from "react-redux";

 import { useNavigate } from 'react-router-dom';
import { adminLogout } from "../../adminAuth/adminAuthSlice";



const AdminHome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
    const handleLogout=()=>{
      dispatch(adminLogout());
      navigate('/admin-login');
      
    }
    return(
  <div className="tw:text-center">
    <h2 className="tw:text-xl tw-font-semibold">Welcome, Admin 🎉</h2>
    <p>Use the tabs above to manage users and stores.</p>
    <button
          onClick={handleLogout}
          className="btn btn-danger"
        >
          Logout
        </button>
  </div>
    )
}

export default AdminHome;
