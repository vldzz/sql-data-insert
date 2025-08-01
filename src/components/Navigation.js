import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { FaDatabase, FaCog, FaHistory, FaShare, FaMoon, FaSun, FaBars, FaTimes } from 'react-icons/fa';

const Navigation = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Generator', icon: <FaDatabase />, href: '#generator' },
    { name: 'Templates', icon: <FaCog />, href: '#templates' },
    { name: 'History', icon: <FaHistory />, href: '#history' },
    { name: 'Share', icon: <FaShare />, href: '#share' }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`navbar navbar-expand-lg ${isDarkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-light'} shadow-sm`}>
      <div className="container">
        <a className="navbar-brand d-flex align-items-center" href="#">
          <FaDatabase className="me-2" />
          <span className="fw-bold">SQL Data Generator</span>
        </a>

        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {navItems.map((item, index) => (
              <li key={index} className="nav-item">
                <a className="nav-link d-flex align-items-center" href={item.href}>
                  {item.icon}
                  <span className="ms-1">{item.name}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="d-flex align-items-center">
            <button
              className={`btn btn-outline-${isDarkMode ? 'light' : 'dark'} me-2`}
              onClick={toggleTheme}
              title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
            >
              {isDarkMode ? <FaSun /> : <FaMoon />}
            </button>
            
            <div className="dropdown">
              <button
                className="btn btn-outline-secondary dropdown-toggle"
                type="button"
                id="userDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fas fa-user me-1"></i>
                User
              </button>
              <ul className="dropdown-menu" aria-labelledby="userDropdown">
                <li><a className="dropdown-item" href="#profile">Profile</a></li>
                <li><a className="dropdown-item" href="#settings">Settings</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#logout">Logout</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;