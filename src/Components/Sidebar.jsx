import { Link, useNavigate } from "react-router-dom";
import React from "react";
import "../Styles/Sidebar.css";

const Sidebar = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const rawRole = localStorage.getItem("role");
  const username = localStorage.getItem("username");
  const role = rawRole ? String(rawRole).toLowerCase() : null;

  if (!rawRole) return null;

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  const handleNavClick = () => {
    if (typeof setOpen === "function") setOpen(false);
  };

  // Format role for display
  const formatRole = (role) => {
    if (!role) return "User";
    const roleMap = {
      admin: "Admin Portal",
      operator: "Operator Portal",
      marketing: "Marketing Portal",
      bank: "Executive Portal",
    };
    return roleMap[role] || "User Portal";
  };

  // Get role avatar background
  const getAvatarBg = (role) => {
    const colorMap = {
      admin: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      operator: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      marketing: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      bank: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    };
    return colorMap[role] || "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
  };

  return (
    <div id="app-sidebar" className={`sidebar ${open ? "open" : ""}`} aria-hidden={rawRole ? "false" : "true"}>
      {/* Header Section */}
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <div className="logo-icon">🏢</div>
          <div className="logo-text">
            <div className="logo-title">DSA CRM</div>
            <div className="logo-subtitle">{formatRole(role)}</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {role === "admin" && (
          <>
            <div className="nav-section">
              <div className="nav-section-label">MAIN MENU</div>
              <Link to="/admin/dashboard" onClick={handleNavClick} className="nav-item">
                <span className="nav-icon">📊</span>
                <span className="nav-text">Dashboard</span>
              </Link>
            </div>

            <div className="nav-section">
              <div className="nav-section-label">MANAGEMENT</div>
              <Link to="/admin/users" onClick={handleNavClick} className="nav-item">
                <span className="nav-icon">👥</span>
                <span className="nav-text">Users</span>
              </Link>
              <Link to="/admin/customers" onClick={handleNavClick} className="nav-item">
                <span className="nav-icon">👤</span>
                <span className="nav-text">Customers</span>
              </Link>
              <Link to="/admin/banks" onClick={handleNavClick} className="nav-item">
                <span className="nav-icon">🏦</span>
                <span className="nav-text">Banks</span>
              </Link>
              <Link to="/admin/documents" onClick={handleNavClick} className="nav-item">
                <span className="nav-icon">📄</span>
                <span className="nav-text">Documents</span>
              </Link>
            </div>

            <div className="nav-section">
              <div className="nav-section-label">LOAN OPERATIONS</div>
              <Link to="/admin/loan-files" onClick={handleNavClick} className="nav-item">
                <span className="nav-icon">📋</span>
                <span className="nav-text">Loan Files</span>
              </Link>
              <Link to="/admin/file-assignment/executive-assignment" onClick={handleNavClick} className="nav-item">
                <span className="nav-icon">🧑‍💼</span>
                <span className="nav-text">Executive Assignment</span>
              </Link>
            </div>

            <div className="nav-section">
              <div className="nav-section-label">ANALYTICS</div>
              <Link to="/admin/reports" onClick={handleNavClick} className="nav-item">
                <span className="nav-icon">📈</span>
                <span className="nav-text">Reports</span>
              </Link>
              <Link to="/admin/commission" onClick={handleNavClick} className="nav-item">
                <span className="nav-icon">💰</span>
                <span className="nav-text">Commission</span>
              </Link>
            </div>
          </>
        )}

        {role === "operator" && (
          <>
            <div className="nav-section">
              <div className="nav-section-label">MAIN MENU</div>
              <Link to="/operator/dashboard" onClick={handleNavClick} className="nav-item">
                <span className="nav-icon">📊</span>
                <span className="nav-text">Dashboard</span>
              </Link>
            </div>

            <div className="nav-section">
              <div className="nav-section-label">CUSTOMER MANAGEMENT</div>
              <Link to="/operator/customers" onClick={handleNavClick} className="nav-item">
                <span className="nav-icon">👤</span>
                <span className="nav-text">Customers</span>
              </Link>
              <Link to="/operator/create-customer" onClick={handleNavClick} className="nav-item">
                <span className="nav-icon">➕</span>
                <span className="nav-text">Create Customer</span>
              </Link>
            </div>

            <div className="nav-section">
              <div className="nav-section-label">LOAN OPERATIONS</div>
              <Link to="/operator/loan-files" onClick={handleNavClick} className="nav-item">
                <span className="nav-icon">📋</span>
                <span className="nav-text">Loan Files</span>
              </Link>
              <Link to="/operator/create-loan" onClick={handleNavClick} className="nav-item">
                <span className="nav-icon">💼</span>
                <span className="nav-text">Create Loan</span>
              </Link>
            </div>

            <div className="nav-section">
              <div className="nav-section-label">DOCUMENTS</div>
              <Link to="/operator/documents" onClick={handleNavClick} className="nav-item">
                <span className="nav-icon">📄</span>
                <span className="nav-text">Documents</span>
              </Link>
            </div>
          </>
        )}

        {role === "marketing" && (
          <>
            <div className="nav-section">
              <div className="nav-section-label">MAIN MENU</div>

              <Link
                to="/marketing/dashboard"
                onClick={handleNavClick}
                className="nav-item"
              >
                <span className="nav-icon">📊</span>
                <span className="nav-text">Dashboard</span>
              </Link>
            </div>

            <div className="nav-section">
              <div className="nav-section-label">LEAD MANAGEMENT</div>

              <Link
                to="/marketing/leads"
                onClick={handleNavClick}
                className="nav-item"
              >
                <span className="nav-icon">📋</span>
                <span className="nav-text">All Leads</span>
              </Link>

              <Link
                to="/marketing/converted-leads"
                onClick={handleNavClick}
                className="nav-item"
              >
                <span className="nav-icon">✅</span>
                <span className="nav-text">Converted Leads</span>
              </Link>
            </div>

            <div className="nav-section">
              <div className="nav-section-label">ANALYTICS</div>

              <Link
                to="/marketing/performance"
                onClick={handleNavClick}
                className="nav-item"
              >
                <span className="nav-icon">📈</span>
                <span className="nav-text">Performance</span>
              </Link>

              <Link
                to="/marketing/reports"
                onClick={handleNavClick}
                className="nav-item"
              >
                <span className="nav-icon">📊</span>
                <span className="nav-text">Reports</span>
              </Link>
            </div>
          </>
        )}


        {role === "bank" && (
          <>
            <div className="nav-section">
              <div className="nav-section-label">MAIN MENU</div>
              <Link to="/bank-executive" onClick={handleNavClick} className="nav-item">
                <span className="nav-icon">📊</span>
                <span className="nav-text">Dashboard</span>
              </Link>
            </div>

            <div className="nav-section">
              <div className="nav-section-label">FILE MANAGEMENT</div>
              <Link to="/bank-executive/my-files" onClick={handleNavClick} className="nav-item">
                <span className="nav-icon">📁</span>
                <span className="nav-text">My Files</span>
              </Link>
              <Link to="/bank-executive/update-status" onClick={handleNavClick} className="nav-item">
                <span className="nav-icon">✅</span>
                <span className="nav-text">Update Status</span>
              </Link>
            </div>

            <div className="nav-section">
              <div className="nav-section-label">DOCUMENTS</div>
              <Link to="/bank-executive/documents" onClick={handleNavClick} className="nav-item">
                <span className="nav-icon">📄</span>
                <span className="nav-text">Documents</span>
              </Link>
              <Link to="/bank-executive/verify-documents" onClick={handleNavClick} className="nav-item">
                <span className="nav-icon">🔍</span>
                <span className="nav-text">Verify Documents</span>
              </Link>
            </div>

            <div className="nav-section">
              <div className="nav-section-label">ACCOUNT</div>
              <Link to="/bank-executive/profile" onClick={handleNavClick} className="nav-item">
                <span className="nav-icon">👤</span>
                <span className="nav-text">Profile</span>
              </Link>
            </div>
          </>
        )}
      </nav>

      {/* User Profile Section */}
      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="user-avatar" style={{ background: getAvatarBg(role) }}>
            {username ? username.charAt(0).toUpperCase() : "U"}
          </div>
          <div className="user-details">
            <div className="user-name">{username || "User"}</div>
            <div className="user-role">
              {role === "admin" && "Admin"}
              {role === "operator" && "Data Operator"}
              {role === "marketing" && "Marketing Executive"}
              {role === "bank" && "Bank Executive"}
            </div>
          </div>
        </div>
        <button className="logout-button" onClick={handleLogout}>
          <span className="logout-icon">➜</span>
          <span className="logout-text">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;