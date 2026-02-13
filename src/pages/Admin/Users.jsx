import { useEffect, useState } from "react";
import Layout from "../../Components/Layout";

const Users = () => {
  /* ---------------- DEFAULT USERS DATA ---------------- */
  const defaultUsers = [
    {
      id: 1,
      name: "Admin User",
      email: "admin@dsacrm.com",
      contact_number: "+91 9876543210",
      username: "admin",
      login_role: "ADMIN",
      status: "Active",
      date_of_registration: "2025-01-01",
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      email: "rajesh@dsacrm.com",
      contact_number: "+91 9876543211",
      username: "rajesh_marketing",
      login_role: "MARKETING_EXECUTIVE",
      status: "Active",
      date_of_registration: "2025-01-05",
    },
    {
      id: 3,
      name: "Priya Sharma",
      email: "priya@dsacrm.com",
      contact_number: "+91 9876543212",
      username: "priya_data",
      login_role: "DATA_OPERATOR",
      status: "Active",
      date_of_registration: "2025-01-10",
    },
    {
      id: 4,
      name: "Amit Patel",
      email: "amit@dsacrm.com",
      contact_number: "+91 9876543213",
      username: "amit_bank",
      login_role: "BANK_EXECUTIVE",
      status: "Inactive",
      date_of_registration: "2025-01-15",
    },
  ];

  /* ---------------- STATE ---------------- */
 const [allUsers, setAllUsers] = useState(() => {
  const storedUsers = JSON.parse(localStorage.getItem("users"));
  return storedUsers && storedUsers.length ? storedUsers : defaultUsers;
});

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(allUsers));
  }, [allUsers]);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact_number: "",
    username: "",
    login_role: "DATA_OPERATOR",
    status: "Active",
  });

  /* ---------------- FILTER USERS ---------------- */
  const filteredUsers = allUsers.filter((user) => {
    const matchesSearch =
      user.name?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase()) ||
      user.username?.toLowerCase().includes(search.toLowerCase());

    const matchesRole = roleFilter === "All" || user.login_role === roleFilter;
    const matchesStatus = statusFilter === "All" || user.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  /* ---------------- ROLE STATS ---------------- */
  const roleStats = {
    total: allUsers.length,
    admin: allUsers.filter((u) => u.login_role === "ADMIN").length,
    dataOperator: allUsers.filter((u) => u.login_role === "DATA_OPERATOR").length,
    marketingExec: allUsers.filter((u) => u.login_role === "MARKETING_EXECUTIVE").length,
    bankExec: allUsers.filter((u) => u.login_role === "BANK_EXECUTIVE").length,
    active: allUsers.filter((u) => u.status === "Active").length,
    inactive: allUsers.filter((u) => u.status === "Inactive").length,
  };

  /* ---------------- HANDLE FORM CHANGE ---------------- */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

/* ---------------- CREATE USER ---------------- */
  const handleCreateUser = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.contact_number || !formData.username) {
      alert("Please fill all required fields");
      return;
    }

    const newUser = {
      id: allUsers.length > 0 ? Math.max(...allUsers.map(u => u.id)) + 1 : 1,
      ...formData,
      date_of_registration: new Date().toISOString().split('T')[0],
    };

    setAllUsers([...allUsers, newUser]);
    
    setFormData({
      name: "",
      email: "",
      contact_number: "",
      username: "",
      login_role: "DATA_OPERATOR",
      status: "Active",
    });
    setShowModal(false);
  };

  return (
    <>
    <Layout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          padding: 0;
        }

        .users-container {
          font-family: 'Plus Jakarta Sans', sans-serif;
          animation: fadeIn 0.6s ease-out;
          padding: 1.5rem;
          max-width: 1400px;
          margin: 0 auto;
          background: #f8fafc;
          min-height: 100vh;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          animation: slideDown 0.7s ease-out;
        }

        @keyframes slideDown {
          from {
            transform: translateY(-30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .header-content h1 {
          font-size: 1.875rem;
          font-weight: 800;
          background: linear-gradient(135deg, #1e293b 0%, #475569 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin: 0 0 0.375rem 0;
          letter-spacing: -0.02em;
        }

        .header-content p {
          color: #64748b;
          font-size: 0.9rem;
          margin: 0;
          font-weight: 500;
        }

        .create-user-btn {
          padding: 0.75rem 1.5rem;
          background: linear-gradient(135deg, #004E89 0%, #003366 100%);
          color: white;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          font-weight: 600;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 12px rgba(0, 78, 137, 0.2);
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .create-user-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 78, 137, 0.3);
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.3s ease-out;
        }

        .modal-content {
          background: white;
          border-radius: 16px;
          padding: 2rem;
          width: 90%;
          max-width: 600px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          animation: slideUp 0.3s ease-out;
        }

        @keyframes slideUp {
          from {
            transform: translateY(30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .modal-header h2 {
          font-size: 1.5rem;
          font-weight: 800;
          color: #1e293b;
          margin: 0;
        }

        .close-btn {
          background: #f1f5f9;
          border: none;
          border-radius: 8px;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 1.25rem;
          color: #64748b;
          transition: all 0.2s;
        }

        .close-btn:hover {
          background: #e2e8f0;
          color: #1e293b;
        }

        .form-grid {
          display: grid;
          gap: 1.25rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-label {
          font-size: 0.875rem;
          font-weight: 600;
          color: #1e293b;
        }

        .required {
          color: #DC2626;
        }

        .form-input {
          padding: 0.75rem;
          border: 2px solid #e2e8f0;
          border-radius: 10px;
          font-size: 0.875rem;
          font-family: 'Plus Jakarta Sans', sans-serif;
          transition: all 0.3s;
          background: white;
          color: #334155;
        }

        .form-input:focus {
          outline: none;
          border-color: #004E89;
          box-shadow: 0 0 0 3px rgba(0, 78, 137, 0.1);
        }

        .form-select {
          padding: 0.75rem;
          border: 2px solid #e2e8f0;
          border-radius: 10px;
          font-size: 0.875rem;
          font-family: 'Plus Jakarta Sans', sans-serif;
          cursor: pointer;
          transition: all 0.3s;
          background: white;
        }

        .form-select:focus {
          outline: none;
          border-color: #004E89;
          box-shadow: 0 0 0 3px rgba(0, 78, 137, 0.1);
        }

        .form-actions {
          display: flex;
          gap: 0.875rem;
          margin-top: 1.5rem;
        }

        .btn-submit {
          flex: 1;
          padding: 0.875rem;
          background: linear-gradient(135deg, #004E89 0%, #003366 100%);
          color: white;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .btn-submit:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 78, 137, 0.3);
        }

        .btn-cancel {
          flex: 1;
          padding: 0.875rem;
          background: #f1f5f9;
          color: #64748b;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .btn-cancel:hover {
          background: #e2e8f0;
          color: #1e293b;
        }

        .stats-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 0.875rem;
          margin-bottom: 1.5rem;
        }

        .stat-chip {
          background: white;
          padding: 0.875rem 1rem;
          border-radius: 10px;
          display: flex;
          align-items: center;
          gap: 0.625rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
          border: 1px solid rgba(226, 232, 240, 0.8);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .stat-chip:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
        }

        .stat-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
        }

        .stat-info {
          flex: 1;
        }

        .stat-label {
          font-size: 0.7rem;
          color: #64748b;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .stat-count {
          font-size: 1.375rem;
          font-weight: 800;
          color: #1e293b;
          font-family: 'JetBrains Mono', monospace;
        }

        .filters-card {
          background: white;
          padding: 1rem;
          border-radius: 12px;
          margin-bottom: 1.25rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
          border: 1px solid rgba(226, 232, 240, 0.8);
        }

        .filters-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 0.875rem;
        }

        .search-box {
          position: relative;
        }

        .search-icon {
          position: absolute;
          left: 0.875rem;
          top: 50%;
          transform: translateY(-50%);
          color: #64748b;
          font-size: 1rem;
        }

        .search-input {
          width: 100%;
          padding: 0.75rem 0.875rem 0.75rem 2.5rem;
          border: 2px solid #e2e8f0;
          border-radius: 10px;
          font-size: 0.875rem;
          font-family: 'Plus Jakarta Sans', sans-serif;
          transition: all 0.3s;
          background: white;
          color: #334155;
        }

        .search-input:focus {
          outline: none;
          border-color: #004E89;
          box-shadow: 0 0 0 3px rgba(0, 78, 137, 0.1);
        }

        .filter-select {
          padding: 0.75rem 0.875rem;
          border: 2px solid #e2e8f0;
          border-radius: 10px;
          font-size: 0.875rem;
          font-family: 'Plus Jakarta Sans', sans-serif;
          cursor: pointer;
          transition: all 0.3s;
          background: white;
          font-weight: 500;
          color: #334155;
        }

        .filter-select:focus {
          outline: none;
          border-color: #004E89;
          box-shadow: 0 0 0 3px rgba(0, 78, 137, 0.1);
        }

        .table-card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
          border: 1px solid rgba(226, 232, 240, 0.8);
        }

        .data-table {
          width: 100%;
          border-collapse: collapse;
        }

        .data-table thead {
          background: linear-gradient(135deg, #f8fafc, #f1f5f9);
          border-bottom: 2px solid #e2e8f0;
        }

        .data-table th {
          padding: 0.875rem 1rem;
          text-align: left;
          font-size: 0.7rem;
          font-weight: 700;
          color: #475569;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .data-table td {
          padding: 0.875rem 1rem;
          border-bottom: 1px solid #f1f5f9;
          color: #334155;
          font-size: 0.875rem;
        }

        .data-table tbody tr {
          transition: all 0.2s;
        }

        .data-table tbody tr:hover {
          background: #f8fafc;
        }

        .data-table tbody tr:last-child td {
          border-bottom: none;
        }

        .user-name {
          font-weight: 600;
          color: #1e293b;
        }

        .user-id {
          font-family: 'JetBrains Mono', monospace;
          color: #64748b;
          font-size: 0.8rem;
        }

        .role-badge {
          display: inline-flex;
          align-items: center;
          padding: 0.3rem 0.625rem;
          border-radius: 6px;
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.025em;
        }

        .role-admin {
          background: rgba(220, 38, 38, 0.1);
          color: #DC2626;
        }

        .role-data-operator {
          background: rgba(0, 78, 137, 0.1);
          color: #004E89;
        }

        .role-marketing-executive {
          background: rgba(245, 158, 11, 0.1);
          color: #f59e0b;
        }

        .role-bank-executive {
          background: rgba(139, 92, 246, 0.1);
          color: #8b5cf6;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          padding: 0.3rem 0.625rem;
          border-radius: 6px;
          font-size: 0.7rem;
          font-weight: 600;
        }

        .status-active {
          background: rgba(31, 168, 131, 0.1);
          color: #1FA883;
        }

        .status-inactive {
          background: rgba(100, 116, 139, 0.1);
          color: #64748b;
        }

        .empty-state {
          text-align: center;
          padding: 3rem 2rem;
          color: #64748b;
        }

        .empty-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        @media (max-width: 968px) {
          .filters-grid {
            grid-template-columns: 1fr;
          }

          .stats-row {
            grid-template-columns: 1fr 1fr;
          }

          .page-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }

          .create-user-btn {
            width: 100%;
            justify-content: center;
          }

          .form-actions {
            flex-direction: column;
          }
        }

        @media (max-width: 768px) {
          .users-container {
            padding: 1rem;
          }

          .data-table {
            font-size: 0.875rem;
          }

          .data-table th,
          .data-table td {
            padding: 0.75rem 0.5rem;
          }

          .modal-content {
            padding: 1.5rem;
          }
        }
      `}</style>

      <div className="users-container">
        <div className="page-header">
          <div className="header-content">
            <h1>User Management</h1>
            <p>Manage system users and assign roles</p>
          </div>
          <button className="create-user-btn" onClick={() => setShowModal(true)}>
            <span>➕</span>
            <span>Create New User</span>
          </button>
        </div>

        <div className="stats-row">
          <div className="stat-chip">
            <div className="stat-icon" style={{ background: "rgba(0, 78, 137, 0.1)", color: "#004E89" }}>
              👥
            </div>
            <div className="stat-info">
              <div className="stat-label">Total Users</div>
              <div className="stat-count">{roleStats.total}</div>
            </div>
          </div>

          <div className="stat-chip">
            <div className="stat-icon" style={{ background: "rgba(220, 38, 38, 0.1)", color: "#DC2626" }}>
              🔑
            </div>
            <div className="stat-info">
              <div className="stat-label">Admins</div>
              <div className="stat-count">{roleStats.admin}</div>
            </div>
          </div>

          <div className="stat-chip">
            <div className="stat-icon" style={{ background: "rgba(0, 78, 137, 0.1)", color: "#004E89" }}>
              📝
            </div>
            <div className="stat-info">
              <div className="stat-label">Data Operators</div>
              <div className="stat-count">{roleStats.dataOperator}</div>
            </div>
          </div>

          <div className="stat-chip">
            <div className="stat-icon" style={{ background: "rgba(245, 158, 11, 0.1)", color: "#f59e0b" }}>
              🎯
            </div>
            <div className="stat-info">
              <div className="stat-label">Marketing</div>
              <div className="stat-count">{roleStats.marketingExec}</div>
            </div>
          </div>

          <div className="stat-chip">
            <div className="stat-icon" style={{ background: "rgba(139, 92, 246, 0.1)", color: "#8b5cf6" }}>
              🏦
            </div>
            <div className="stat-info">
              <div className="stat-label">Bank Execs</div>
              <div className="stat-count">{roleStats.bankExec}</div>
            </div>
          </div>

        <div className="stat-chip">
            <div className="stat-icon" style={{ background: "rgba(31, 168, 131, 0.1)", color: "#1FA883" }}>
              ✅
            </div>
            <div className="stat-info">
              <div className="stat-label">Active</div>
              <div className="stat-count">{roleStats.active}</div>
            </div>
          </div>

          <div className="stat-chip">
            <div className="stat-icon" style={{ background: "rgba(100, 116, 139, 0.1)", color: "#64748b" }}>
              ⏸️
            </div>
            <div className="stat-info">
              <div className="stat-label">Inactive</div>
              <div className="stat-count">{roleStats.inactive}</div>
            </div>
          </div>
        </div>

        <div className="filters-card">
          <div className="filters-grid">
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search by name, email, or username..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-input"
              />
            </div>

            <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="filter-select">
              <option value="All">All Roles</option>
              <option value="ADMIN">Admin</option>
              <option value="DATA_OPERATOR">Data Operator</option>
              <option value="MARKETING_EXECUTIVE">Marketing Executive</option>
              <option value="BANK_EXECUTIVE">Bank Executive</option>
            </select>

            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="filter-select">
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="table-card">
          <table className="data-table">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Username</th>
                <th>Role</th>
                <th>Status</th>
                <th>Registered</th>
              </tr>
            </thead>

<tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="8">
                    <div className="empty-state">
                      <div className="empty-icon">👥</div>
                      <h3>No users found</h3>
                      <p>Try adjusting your search or filters</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <span className="user-id">{user.id}</span>
                    </td>
                    <td>
                      <span className="user-name">{user.name || "N/A"}</span>
                    </td>
                    <td>{user.email || "N/A"}</td>
                    <td>{user.contact_number || "N/A"}</td>
                    <td>
                      <span className="user-id">{user.username || "N/A"}</span>
                    </td>
                    <td>
                      <span className={`role-badge role-${(user.login_role || "").toLowerCase().replace(/_/g, "-")}`}>
                        {(user.login_role || "N/A").replace(/_/g, " ")}
                      </span>
                    </td>
                    <td>
                      <span className={`status-badge status-${(user.status || "active").toLowerCase()}`}>
                        <span>●</span>
                        <span>{user.status || "Active"}</span>
                      </span>
                    </td>
                    <td>{user.date_of_registration || "N/A"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Create New User</h2>
                <button className="close-btn" onClick={() => setShowModal(false)}>
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateUser}>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">
                      Name <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Enter full name"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Email <span className="required">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="user@dsacrm.com"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Contact Number <span className="required">*</span>
                    </label>
                    <input
                      type="tel"
                      name="contact_number"
                      value={formData.contact_number}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="+91 9876543210"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Username <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="username"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Login Role <span className="required">*</span>
                    </label>
                    <select
                      name="login_role"
                      value={formData.login_role}
                      onChange={handleInputChange}
                      className="form-select"
                      required
                    >
                      <option value="DATA_OPERATOR">Data Operator</option>
                      <option value="MARKETING_EXECUTIVE">Marketing Executive</option>
                      <option value="BANK_EXECUTIVE">Bank Executive</option>
                      <option value="ADMIN">Admin</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Status <span className="required">*</span>
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="form-select"
                      required
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>

                <div className="form-actions">
                  <button type="button" className="btn-cancel" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-submit">
                    Create User
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
    </>
  );
};

export default Users;