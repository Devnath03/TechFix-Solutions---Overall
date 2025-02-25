import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('authToken');
      toast.success('Logged out successfully!');
      navigate('/login');
    }
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
        <div className="brand-wrapper">
          <i className='bx bxs-wrench logo-icon'></i>
          <span className="brand-text">TechFix  Solutions</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              <i className='bx bxs-dashboard nav-icon'></i>
              <span className="nav-text">Dashboard</span>
              <div className="hover-effect"></div>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/suppliers" className="nav-link">
              <i className='bx bxs-truck nav-icon'></i>
              <span className="nav-text">Suppliers</span>
              <div className="hover-effect"></div>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/quotations" className="nav-link">
              <i className='bx bxs-file nav-icon'></i>
              <span className="nav-text">Quotations</span>
              <div className="hover-effect"></div>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/orders" className="nav-link">
              <i className='bx bxs-package nav-icon'></i>
              <span className="nav-text">Orders</span>
              <div className="hover-effect"></div>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/inventory" className="nav-link">
              <i className='bx bxs-cube nav-icon'></i>
              <span className="nav-text">Inventory</span>
              <div className="hover-effect"></div>
            </Link>
          </li>
        </ul>

        <div className="sidebar-footer">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/settings" className="nav-link">
                <i className='bx bxs-cog nav-icon'></i>
                <span className="nav-text">Settings</span>
                <div className="hover-effect"></div>
              </Link>
            </li>
            <li className="nav-item">
              <button className="nav-link logout-btn" onClick={handleLogout}>
                <i className='bx bx-power-off nav-icon'></i>
                <span className="nav-text">Logout</span>
                <div className="hover-effect"></div>
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;