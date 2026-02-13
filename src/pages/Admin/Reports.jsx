import { useEffect, useState } from "react";
import Layout from "../../Components/Layout";

const Reports = () => {
  const [users, setUsers] = useState([]);
  const [loanFiles, setLoanFiles] = useState([]);
  const [banks, setBanks] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [filterRole, setFilterRole] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const savedUsers = localStorage.getItem("users");
    const savedFiles = localStorage.getItem("loanFiles");
    const savedBanks = localStorage.getItem("banks");
    const savedCustomers = localStorage.getItem("customers");
    
    setUsers(savedUsers ? JSON.parse(savedUsers) : []);
    setLoanFiles(savedFiles ? JSON.parse(savedFiles) : []);
    setBanks(savedBanks ? JSON.parse(savedBanks) : []);
    setCustomers(savedCustomers ? JSON.parse(savedCustomers) : []);
  }, []);

  // Filter users
  const filteredUsers = users.filter(u => {
    const matchesSearch = 
      u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const role = (u.login_role || u.role || "").toUpperCase();
    const matchesRole = filterRole === "All" || role === filterRole.toUpperCase().replace(/ /g, "_");
    
    return matchesSearch && matchesRole;
  });

  // Calculate stats
  const stats = {
    totalUsers: users.length,
    admins: users.filter(u => {
      const role = (u.login_role || u.role || "").toUpperCase();
      return role === "ADMIN";
    }).length,
    dataOperators: users.filter(u => {
      const role = (u.login_role || u.role || "").toUpperCase();
      return role === "DATA_OPERATOR" || role === "DATA OPERATOR";
    }).length,
    marketing: users.filter(u => {
      const role = (u.login_role || u.role || "").toUpperCase();
      return role === "MARKETING_EXECUTIVE" || role === "MARKETING EXECUTIVE";
    }).length,
    bankExec: users.filter(u => {
      const role = (u.login_role || u.role || "").toUpperCase();
      return role === "BANK_EXECUTIVE" || role === "BANK EXECUTIVE";
    }).length,
    activeUsers: users.filter(u => {
      const status = (u.status || "").toLowerCase();
      return status === "active";
    }).length,
    totalFiles: loanFiles.length,
    assignedFiles: loanFiles.filter(f => f.assignedOperator || f.assignedBank).length,
    totalBanks: banks.length,
    activeBanks: banks.filter(b => b.status === "Active").length,
    totalCustomers: customers.length,
  };

  // Export to CSV
  const exportToCSV = () => {
    const headers = ["Name", "Email", "Contact", "Username", "Role", "Status", "Registered"];
    const rows = filteredUsers.map(u => [
      u.name || "",
      u.email || "",
      u.contact_number || u.contact || "",
      u.username || "",
      (u.login_role || u.role || "").replace(/_/g, " "),
      u.status || "",
      u.date_of_registration || ""
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `user-report-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Layout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');

        * {
          box-sizing: border-box;
        }

        .reports-container {
          font-family: 'Plus Jakarta Sans', sans-serif;
          animation: fadeIn 0.6s ease-out;
          padding: 1.5rem;
          max-width: 1600px;
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

        .export-btn {
          padding: 0.75rem 1.5rem;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
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
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .export-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
        }

        /* Stats Grid */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 0.875rem;
          margin-bottom: 1.5rem;
        }

        .stat-card {
          background: white;
          padding: 1.25rem;
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
          border: 1px solid rgba(226, 232, 240, 0.8);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .stat-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
        }

        .stat-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
        }

        .stat-icon {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
        }

        .stat-info {
          flex: 1;
        }

        .stat-label {
          font-size: 0.75rem;
          color: #64748b;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.25rem;
        }

        .stat-value {
          font-size: 1.875rem;
          font-weight: 800;
          color: #1e293b;
          font-family: 'JetBrains Mono', monospace;
        }

        /* Section Headers */
        .section-header {
          background: white;
          padding: 1rem;
          border-radius: 12px;
          margin-bottom: 1.25rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
          border: 1px solid rgba(226, 232, 240, 0.8);
        }

        .section-title {
          font-size: 1.125rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        /* Filters */
        .filters-row {
          display: grid;
          grid-template-columns: 2fr 1fr;
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

        /* Table */
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

        .table-footer {
          padding: 1rem;
          text-align: center;
          color: #64748b;
          font-size: 0.875rem;
          font-weight: 500;
          border-top: 1px solid #f1f5f9;
        }

        @media (max-width: 968px) {
          .filters-row {
            grid-template-columns: 1fr;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .page-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }

          .export-btn {
            width: 100%;
            justify-content: center;
          }
        }

        @media (max-width: 768px) {
          .reports-container {
            padding: 1rem;
          }

          .data-table {
            font-size: 0.875rem;
          }

          .data-table th,
          .data-table td {
            padding: 0.75rem 0.5rem;
          }

          .table-card {
            overflow-x: auto;
          }

          .data-table {
            min-width: 800px;
          }
        }

        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="reports-container">
        <div className="page-header">
          <div className="header-content">
            <h1>System Reports & Analytics</h1>
            <p>Comprehensive overview of users, files, and system activity</p>
          </div>
          <button className="export-btn" onClick={exportToCSV}>
            <span>📊</span>
            <span>Export to CSV</span>
          </button>
        </div>

        {/* Overview Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-header">
              <div className="stat-icon" style={{ background: "rgba(0, 78, 137, 0.1)", color: "#004E89" }}>
                👥
              </div>
              <div className="stat-info">
                <div className="stat-label">Total Users</div>
                <div className="stat-value">{stats.totalUsers}</div>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <div className="stat-icon" style={{ background: "rgba(220, 38, 38, 0.1)", color: "#DC2626" }}>
                🔑
              </div>
              <div className="stat-info">
                <div className="stat-label">Admins</div>
                <div className="stat-value">{stats.admins}</div>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <div className="stat-icon" style={{ background: "rgba(0, 78, 137, 0.1)", color: "#004E89" }}>
                📝
              </div>
              <div className="stat-info">
                <div className="stat-label">Data Operators</div>
                <div className="stat-value">{stats.dataOperators}</div>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <div className="stat-icon" style={{ background: "rgba(245, 158, 11, 0.1)", color: "#f59e0b" }}>
                🎯
              </div>
              <div className="stat-info">
                <div className="stat-label">Marketing</div>
                <div className="stat-value">{stats.marketing}</div>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <div className="stat-icon" style={{ background: "rgba(139, 92, 246, 0.1)", color: "#8b5cf6" }}>
                🏦
              </div>
              <div className="stat-info">
                <div className="stat-label">Bank Execs</div>
                <div className="stat-value">{stats.bankExec}</div>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <div className="stat-icon" style={{ background: "rgba(31, 168, 131, 0.1)", color: "#1FA883" }}>
                ✅
              </div>
              <div className="stat-info">
                <div className="stat-label">Active Users</div>
                <div className="stat-value">{stats.activeUsers}</div>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <div className="stat-icon" style={{ background: "rgba(0, 78, 137, 0.1)", color: "#004E89" }}>
                📋
              </div>
              <div className="stat-info">
                <div className="stat-label">Total Files</div>
                <div className="stat-value">{stats.totalFiles}</div>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <div className="stat-icon" style={{ background: "rgba(16, 185, 129, 0.1)", color: "#10b981" }}>
                🏦
              </div>
              <div className="stat-info">
                <div className="stat-label">Active Banks</div>
                <div className="stat-value">{stats.activeBanks}</div>
              </div>
            </div>
          </div>
        </div>

        {/* User Details Section */}
        <div className="section-header">
          <h2 className="section-title">
            <span>📊</span>
            User Details Report
          </h2>
          <div className="filters-row">
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search by name, username, or email..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="filter-select"
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
            >
              <option value="All">All Roles</option>
              <option value="Admin">Admin</option>
              <option value="Data Operator">Data Operator</option>
              <option value="Marketing Executive">Marketing Executive</option>
              <option value="Bank Executive">Bank Executive</option>
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
                      <div className="empty-icon">📊</div>
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
                    <td>{user.contact_number || user.contact || "N/A"}</td>
                    <td>
                      <span className="user-id">{user.username || "N/A"}</span>
                    </td>
                    <td>
                      <span className={`role-badge role-${((user.login_role || user.role) || "").toLowerCase().replace(/_/g, "-")}`}>
                        {((user.login_role || user.role) || "N/A").replace(/_/g, " ")}
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
          {filteredUsers.length > 0 && (
            <div className="table-footer">
              Showing {filteredUsers.length} of {users.length} users
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Reports;