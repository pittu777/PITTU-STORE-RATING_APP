// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { logoutUser } from './../features/auth/authSlice';
// import { NavLink, useNavigate } from 'react-router-dom';

// const Navbar = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.auth.user);

//   const handleLogin = () => {
//     navigate('/login');
//   };

//   const handleLogout = () => {
//     dispatch(logoutUser());
//     navigate('/login');
//   };

//   const handleProfile = () => {
//     navigate('/profile');
//   };

  

//   return (
//     <nav className="navbar navbar-expand-lg bg-body-tertiary">
//       <div className="container-fluid">
//         <a className="navbar-brand" href="#">Pittu's Store</a>
//         <form className="d-flex" role="search">
//           <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
//           <button className="btn btn-outline-success" type="submit">Search</button>
//         </form>
        
        
//         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse" id="navbarSupportedContent">
//         <ul class="navbar-nav me-auto mb-2 mb-lg-0">
//           <li className="nav-item dropdown">
      
//               <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
//                 Profile
//               </a>
//               <ul className="dropdown-menu">
//                 {user ? (
//                   <>
//                     <li className='tw:my-2'>
//                       <span>
//                         <button onClick={handleProfile} className='btn btn-primary d-flex align-items-center justify-content-center gap-2'>
//                           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
//                             <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
//                           </svg>Profile
//                         </button>


//                       </span>
//                     </li>
//                     <li>
//                       <button className="btn btn-danger" onClick={handleLogout}>
//                         Logout
//                       </button>
//                     </li>
//                   </>
//                 ) : (
//                   <li>
//                     <span className="dropdown-item">User not logged in</span>
//                   </li>
//                 )}
//               </ul>
//             </li>
//         </ul>
//           <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//             <li className="nav-item">
//               {!user ? (
//                 <span className="nav-link tw:cursor-pointer" onClick={handleLogin}>Login</span>
//               ) : null}
//             </li>
            
//           </ul>
      
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { adminLogout } from '../features/adminAuth/adminAuthSlice';

const Navbar = ({ onTabChange, currentTab }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  

  const user = useSelector((state) => state.auth.user);
  const adminAuth = useSelector((state) => state.adminAuth);

  const admin = adminAuth.admin;
  const isAdmin = admin?.role === 'ADMIN';

  console.log("Admin auth data:", adminAuth);
  console.log("Admin user object:", admin);
  console.log("Is admin:", isAdmin);

  const handleLogout = () => {
    dispatch(adminLogout());
    navigate('/login');
  };

  const handleProfile = () => {
    navigate('/profile');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Pittu's Store</a>

        <form className="d-flex" role="search">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-success" type="submit">Search</button>
        </form>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          
          {isAdmin && (
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {["home", "users", "stores", "add"].map((tab) => (
                <li className="nav-item tw:text-black" key={tab}>
                  <button
                    className={`nav-link btn ${currentTab === tab ? "btn-primary text-black" : "btn-outline-primary"} mx-1`}
                    onClick={() => onTabChange(tab)}
                  >
                    {tab === "home" && "Home"}
                    {tab === "users" && "Users"}
                    {tab === "stores" && "Stores"}
                    {tab === "add" && "Add Store"}
                  </button>
                </li>
              ))}
            </ul>
          )}

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {(user || admin) && (
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                Profile
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li className='dropdown-item'>
                    {user?.name || admin?.name}
                    {isAdmin && <div className="text-muted small">Administrator</div>}
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item" onClick={handleProfile}>
                      My Profile
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item text-danger" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;