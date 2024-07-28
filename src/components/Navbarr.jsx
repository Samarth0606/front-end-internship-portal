import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const { authState, logout } = useContext(AuthContext);
  const { isAuthenticated, user } = authState;
console.log(isAuthenticated , "isauth")
  const handleLogout = () => {
    logout();
  };

  return (
    <nav className='navbar  '>
      <div className='navbar-container'>
      <div className="navbar-links">
        <div className='logo'>
        <img src="https://w7.pngwing.com/pngs/95/190/png-transparent-internshala-microsoft-student-partners-birla-institute-of-technology-and-science-pilani-student-blue-text-people.png" className='image' alt="" />
        </div>
        
          <div className='nav-part-2'>
          <Link to="/opportunities">Opportunities</Link>
          <Link to="/">Home</Link>
          </div>
        </div>
        <div className='twobuttons'>
        {isAuthenticated ? (
            <>
              <button onClick={handleLogout} className="navbar-button">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-button  ">Login</Link>
              <Link to="/register" className="navbar-button">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;