import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from './../features/auth/authApi';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Navbar</a>
        <form className="d-flex" role="search">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              {!user ? (
                <span className="nav-link tw:cursor-pointer" onClick={handleLogin}>Login</span>
              ) : null}
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Profile
              </a>
              <ul className="dropdown-menu">
                {user ? (
                  <>
                    <li>
                      <span className="dropdown-item"><Link
                      to="/profile">
                      {user.email}
                      </Link></span>
                    </li>
                    <li>
                      <span className="dropdown-item tw:cursor-pointer" onClick={handleLogout}>
                        Logout
                      </span>
                    </li>
                  </>
                ) : (
                  <li>
                    <span className="dropdown-item">User not logged in</span>
                  </li>
                )}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
