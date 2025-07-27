import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);
  const { isAuthenticated, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar is-fixed-top" style={{ background: 'var(--dbz-gradient-primary)', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          <span style={{ 
            color: 'white', 
            fontSize: '1.5rem', 
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
          }}>
            Ki_Data
          </span>
        </Link>

        <a
          role="button"
          className={`navbar-burger ${isActive ? 'is-active' : ''}`}
          aria-label="menu"
          aria-expanded="false"
          onClick={() => setIsActive(!isActive)}
        >
          <span></span>
          <span></span>
          <span></span>
        </a>
      </div>

      <div className={`navbar-menu ${isActive ? 'is-active' : ''}`}>
        <div className="navbar-start">
          <Link to="/characters" className="navbar-item" style={{ color: 'white', fontWeight: '600' }}>
            Characters
          </Link>
          
          {isAuthenticated && (
            <Link to="/chat" className="navbar-item" style={{ color: 'white', fontWeight: '600' }}>
              Dende Chat
            </Link>
          )}
          
          {isAdmin() && (
            <Link to="/create-character" className="navbar-item" style={{ color: 'white', fontWeight: '600' }}>
              Create Character
            </Link>
          )}
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {!isAuthenticated ? (
                <>
                  <Link to="/register" className="button dbz-button is-blue">
                    <strong>Sign up</strong>
                  </Link>
                  <Link to="/login" className="button dbz-button">
                    Log in
                  </Link>
                </>
              ) : (
                <button onClick={handleLogout} className="button dbz-button">
                  <strong>Logout</strong>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;