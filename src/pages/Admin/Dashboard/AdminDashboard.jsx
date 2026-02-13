import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../Styles/AdminDashboard.css";
import Layout from "../../../Components/Layout";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
  Area,
  AreaChart,
} from "recharts";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    total: 0,
    inProcess: 0,
    disbursement: 0,
    completed: 0,
    rejected: 0,
  });

  /* ---------------- SEED DATA (ONE TIME) ---------------- */
  useEffect(() => {
    if (!localStorage.getItem("users")) {
      localStorage.setItem(
        "users",
        JSON.stringify([
          { id: 1, role: "ADMIN" },
          { id: 2, role: "AGENT" },
          { id: 3, role: "AGENT" },
          { id: 4, role: "DATA_OPERATOR" },
          { id: 5, role: "BANK_EXECUTIVE" },
          { id: 6, role: "BANK_EXECUTIVE" },
        ])
      );
    }

    if (!localStorage.getItem("banks")) {
      localStorage.setItem(
        "banks",
        JSON.stringify([
          { id: 1, name: "HDFC", active: true },
          { id: 2, name: "ICICI", active: true },
          { id: 3, name: "SBI", active: true },
          { id: 4, name: "Axis", active: false },
        ])
      );
    }

    if (!localStorage.getItem("documents")) {
      localStorage.setItem(
        "documents",
        JSON.stringify([
          { id: 1, status: "Pending" },
          { id: 2, status: "Pending" },
          { id: 3, status: "Submitted" },
          { id: 4, status: "Verified" },
          { id: 5, status: "Rejected" },
          { id: 6, status: "Verified" },
        ])
      );
    }
  }, []);

  /* ---------------- LOAD LOAN STATS ---------------- */
  useEffect(() => {
    const loans = (JSON.parse(localStorage.getItem("loanFiles")) || []).filter(
      (l) => l.status !== "Deleted"
    );

    setStats({
      total: loans.length,
      inProcess: loans.filter((l) => l.status === "In-Process").length,
      disbursement: loans.filter((l) => l.status === "Is-Disbursement").length,
      completed: loans.filter((l) => l.status === "Completed").length,
      rejected: loans.filter((l) => l.status === "Rejected").length,
    });
  }, []);

  /* ---------------- USER STATS ---------------- */
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const userStats = {
    totalUsers: users.length,
    agents: users.filter((u) => u.role === "AGENT").length,
    dataOperators: users.filter((u) => u.role === "DATA_OPERATOR").length,
    bankExecutives: users.filter((u) => u.role === "BANK_EXECUTIVE").length,
  };

  /* ---------------- BANK STATS ---------------- */
  const banks = JSON.parse(localStorage.getItem("banks")) || [];
  const loans = JSON.parse(localStorage.getItem("loanFiles")) || [];

  const totalBanks = banks.length;
  const activeBanks = banks.filter((b) => b.active).length;
  const inactiveBanks = banks.filter((b) => !b.active).length;

  const bankLoanCount = {};
  loans.forEach((loan) => {
    if (!loan.bankName) return;
    bankLoanCount[loan.bankName] = (bankLoanCount[loan.bankName] || 0) + 1;
  });

  const topBank =
    Object.keys(bankLoanCount).length > 0
      ? Object.keys(bankLoanCount).reduce((a, b) =>
          bankLoanCount[a] > bankLoanCount[b] ? a : b
        )
      : "N/A";

  /* ---------------- DOCUMENT STATS ---------------- */
  const documents = JSON.parse(localStorage.getItem("documents")) || [];

  const docStats = {
    pending: documents.filter((d) => d.status === "Pending").length,
    submitted: documents.filter((d) => d.status === "Submitted").length,
    verified: documents.filter((d) => d.status === "Verified").length,
    rejected: documents.filter((d) => d.status === "Rejected").length,
  };

  /* ---------------- COMMISSION SNAPSHOT ---------------- */
  // Commission rate (1%)
  const COMMISSION_RATE = 0.01;

  // Only disbursed loans are eligible
  const disbursedLoans = loans.filter(
    (loan) => loan.status === "Is-Disbursement"
  );

  // Total commission
  const totalCommission = disbursedLoans.reduce((sum, loan) => {
    const amount = Number(String(loan.amount).replace(/,/g, "") || 0);
    return sum + amount * COMMISSION_RATE;
  }, 0);

  // Assume 70% paid, 30% pending (temporary logic)
  const paidCommission = totalCommission * 0.7;
  const pendingCommission = totalCommission * 0.3;

  /* ---------------- CHART DATA ---------------- */
  const barData = [
    { name: "In-Process", value: stats.inProcess },
    { name: "Disbursement", value: stats.disbursement },
    { name: "Completed", value: stats.completed },
    { name: "Rejected", value: stats.rejected },
  ];

  const pieData = [
    { name: "In-Process", value: stats.inProcess, color: "#FF6B35" },
    { name: "Disbursement", value: stats.disbursement, color: "#004E89" },
    { name: "Completed", value: stats.completed, color: "#1FA883" },
    { name: "Rejected", value: stats.rejected, color: "#DC2626" },
  ];

  const trendData = [
    { month: "Jan", loans: 8, revenue: 450 },
    { month: "Feb", loans: 12, revenue: 680 },
    { month: "Mar", loans: 15, revenue: 820 },
    { month: "Apr", loans: 10, revenue: 590 },
    { month: "May", loans: 18, revenue: 950 },
    { month: "Jun", loans: 22, revenue: 1200 },
  ];

  // Calculate completion rate
  const completionRate =
    stats.total > 0 ? ((stats.completed / stats.total) * 100).toFixed(1) : 0;

  return (
    <>
    <Layout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');
        
        * {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .dashboard-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          padding: 2rem;
          animation: fadeIn 0.6s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2.5rem;
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
          font-size: 2.5rem;
          font-weight: 800;
          background: linear-gradient(135deg, #1e293b 0%, #475569 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin: 0;
          letter-spacing: -0.02em;
        }

        .header-content p {
          color: #64748b;
          font-size: 0.95rem;
          margin-top: 0.5rem;
          font-weight: 500;
        }

        .create-btn {
          padding: 0.875rem 1.75rem;
          background: linear-gradient(135deg, #004E89 0%, #003366 100%);
          color: white;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          font-weight: 600;
          font-size: 0.95rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 12px rgba(0, 78, 137, 0.2);
          min-width: 180px;          /* 🔥 SAME WIDTH */
          height: 52px; 
        }

        .create-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 78, 137, 0.3);
          background: linear-gradient(135deg, #003d6e 0%, #002952 100%);
        }

        .create-btn:active {
          transform: translateY(0);
        }

        .header-buttons {
          display: flex;
          gap: 12px;
        }

        // .logout-btn {
        //   padding: 0.875rem 1.75rem;
        //   background: linear-gradient(135deg, #DC2626 0%, #b91c1c 100%);
        //   color: white;
        //   border: none;
        //   border-radius: 12px;
        //   cursor: pointer;
        //   font-weight: 600;
        //   font-size: 0.95rem;
        //   display: flex;
        //   align-items: center;
        //   gap: 0.5rem;
        //   transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        //   box-shadow: 0 4px 12px rgba(220, 38, 38, 0.2);
        // }

        // .logout-btn:hover {
        //   transform: translateY(-2px);
        //   box-shadow: 0 8px 20px rgba(220, 38, 38, 0.3);
        //   background: linear-gradient(135deg, #b91c1c 0%, #991b1b 100%);
        // }

        // .logout-btn:active {
        //   transform: translateY(0);
        // }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.25rem;
          margin-bottom: 2.5rem;
        }

        .stat-card {
          background: white;
          border-radius: 16px;
          padding: 1.75rem;
          position: relative;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          animation: slideUp 0.6s ease-out backwards;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
          border: 1px solid rgba(226, 232, 240, 0.8);
        }

        .stat-card:nth-child(1) { animation-delay: 0.1s; }
        .stat-card:nth-child(2) { animation-delay: 0.15s; }
        .stat-card:nth-child(3) { animation-delay: 0.2s; }
        .stat-card:nth-child(4) { animation-delay: 0.25s; }
        .stat-card:nth-child(5) { animation-delay: 0.3s; }

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

        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08);
          border-color: rgba(0, 78, 137, 0.2);
        }

        .stat-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--accent-color), var(--accent-color-light));
          opacity: 0;
          transition: opacity 0.3s;
        }

        .stat-card:hover::before {
          opacity: 1;
        }

        .stat-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          margin-bottom: 1rem;
          background: var(--accent-bg);
          color: var(--accent-color);
        }

        .stat-label {
          color: #64748b;
          font-size: 0.875rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.5rem;
        }

        .stat-value {
          font-size: 2.25rem;
          font-weight: 800;
          color: #1e293b;
          line-height: 1;
          font-family: 'JetBrains Mono', monospace;
        }

        .stat-trend {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          margin-top: 0.75rem;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .trend-up {
          color: #1FA883;
        }

        .trend-down {
          color: #DC2626;
        }

        .section-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 1.25rem;
          margin-top: 2.5rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .section-title::before {
          content: '';
          width: 4px;
          height: 24px;
          background: linear-gradient(180deg, #004E89, #1FA883);
          border-radius: 4px;
        }

        .charts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .chart-card {
          background: white;
          border-radius: 16px;
          padding: 2rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
          border: 1px solid rgba(226, 232, 240, 0.8);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .chart-card:hover {
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
          border-color: rgba(0, 78, 137, 0.2);
        }

        .chart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .chart-title {
          font-size: 1.125rem;
          font-weight: 700;
          color: #1e293b;
          margin: 0;
        }

        .chart-badge {
          background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
          color: #475569;
          padding: 0.375rem 0.875rem;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 600;
          font-family: 'JetBrains Mono', monospace;
        }

        .insight-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.25rem;
          margin-bottom: 2rem;
        }

        .insight-card {
          background: linear-gradient(135deg, #004E89 0%, #003366 100%);
          border-radius: 16px;
          padding: 2rem;
          color: white;
          position: relative;
          overflow: hidden;
        }

        .insight-card::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
          pointer-events: none;
        }

        .insight-card h3 {
          font-size: 0.875rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          opacity: 0.9;
          margin: 0 0 1rem 0;
        }

        .insight-value {
          font-size: 2.5rem;
          font-weight: 800;
          margin: 0;
          font-family: 'JetBrains Mono', monospace;
        }

        .insight-description {
          margin-top: 0.75rem;
          opacity: 0.8;
          font-size: 0.9rem;
        }

        /* Color variants */
        .stat-card.total {
          --accent-color: #004E89;
          --accent-color-light: #0066b3;
          --accent-bg: rgba(0, 78, 137, 0.1);
        }

        .stat-card.process {
          --accent-color: #FF6B35;
          --accent-color-light: #ff8c5a;
          --accent-bg: rgba(255, 107, 53, 0.1);
        }

        .stat-card.disbursement {
          --accent-color: #004E89;
          --accent-color-light: #0066b3;
          --accent-bg: rgba(0, 78, 137, 0.1);
        }

        .stat-card.completed {
          --accent-color: #1FA883;
          --accent-color-light: #2cc99a;
          --accent-bg: rgba(31, 168, 131, 0.1);
        }

        .stat-card.rejected {
          --accent-color: #DC2626;
          --accent-color-light: #ef4444;
          --accent-bg: rgba(220, 38, 38, 0.1);
        }

        @media (max-width: 768px) {
          .dashboard-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }

          .header-buttons {
            width: 100%;
            flex-direction: column;
          }

          .create-btn,
          .logout-btn {
            width: 100%;
            justify-content: center;
          }

          .charts-grid {
            grid-template-columns: 1fr;
          }

          .header-content h1 {
            font-size: 2rem;
          }
        }
      `}</style>

      <div className="dashboard-container">
        <div className="dashboard-header">
          <div className="header-content">
            <h1>Admin Dashboard</h1>
            <p>Comprehensive loan performance and operations overview</p>
          </div>
          <div className="header-buttons">
            <button
              className="create-btn"
              onClick={() => navigate("/admin/create-loan")}
            >
              <span>➕</span>
              <span>Create Loan File</span>
            </button>
            {/* <button
              className="logout-btn"
              onClick={() => {
                // Clear any session data
                sessionStorage.clear();
                // Redirect to home page
                navigate("/");
              }}
            >
              <span>🚪</span>
              <span>Logout</span>
            </button> */}
          </div>
        </div>

        {/* PRIMARY STATS */}
        <div className="stats-grid">
          <StatCard
            icon="📊"
            label="Total Loans"
            value={stats.total}
            trend="+12%"
            trendUp={true}
            variant="total"
          />
          <StatCard
            icon="⏳"
            label="In-Process"
            value={stats.inProcess}
            trend="+5%"
            trendUp={true}
            variant="process"
          />
          <StatCard
            icon="💰"
            label="Disbursement"
            value={stats.disbursement}
            trend="+8%"
            trendUp={true}
            variant="disbursement"
          />
          <StatCard
            icon="✅"
            label="Completed"
            value={stats.completed}
            trend="+15%"
            trendUp={true}
            variant="completed"
          />
          <StatCard
            icon="❌"
            label="Rejected"
            value={stats.rejected}
            trend="-3%"
            trendUp={false}
            variant="rejected"
          />
        </div>

        {/* INSIGHTS */}
        <div className="insight-cards">
          <div className="insight-card">
            <h3>Completion Rate</h3>
            <div className="insight-value">{completionRate}%</div>
            <p className="insight-description">
              Success rate across all loan applications
            </p>
          </div>
          <div className="insight-card" style={{background: 'linear-gradient(135deg, #1FA883 0%, #16875e 100%)'}}>
            <h3>Active Users</h3>
            <div className="insight-value">{userStats.totalUsers}</div>
            <p className="insight-description">
              Team members actively managing operations
            </p>
          </div>
          <div className="insight-card" style={{background: 'linear-gradient(135deg, #FF6B35 0%, #e55520 100%)'}}>
            <h3>Bank Partners</h3>
            <div className="insight-value">{activeBanks}/{totalBanks}</div>
            <p className="insight-description">
              Active banking partnerships for lending
            </p>
          </div>
        </div>

        {/* CHARTS */}
        <h2 className="section-title">Performance Analytics</h2>
        <div className="charts-grid">
          <div className="chart-card">
            <div className="chart-header">
              <h3 className="chart-title">Loan Status Distribution</h3>
              <span className="chart-badge">LIVE DATA</span>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={barData}>
                <XAxis
                  dataKey="name"
                  stroke="#94a3b8"
                  tick={{ fill: "#64748b", fontSize: 12, fontWeight: 600 }}
                />
                <YAxis
                  stroke="#94a3b8"
                  tick={{ fill: "#64748b", fontSize: 12, fontWeight: 600 }}
                />
                <Tooltip
                  contentStyle={{
                    background: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "12px",
                    padding: "12px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  }}
                />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {barData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        index === 0
                          ? "#FF6B35"
                          : index === 1
                          ? "#004E89"
                          : index === 2
                          ? "#1FA883"
                          : "#DC2626"
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card">
            <div className="chart-header">
              <h3 className="chart-title">Status Overview</h3>
              <span className="chart-badge">REAL-TIME</span>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={95}
                  innerRadius={60}
                  label={({ name, value }) => `${name}: ${value}`}
                  labelLine={{ stroke: "#94a3b8", strokeWidth: 1 }}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "12px",
                    padding: "12px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card">
            <div className="chart-header">
              <h3 className="chart-title">6-Month Trend</h3>
              <span className="chart-badge">GROWTH +45%</span>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorLoans" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#004E89" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#004E89" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="month"
                  stroke="#94a3b8"
                  tick={{ fill: "#64748b", fontSize: 12, fontWeight: 600 }}
                />
                <YAxis
                  stroke="#94a3b8"
                  tick={{ fill: "#64748b", fontSize: 12, fontWeight: 600 }}
                />
                <Tooltip
                  contentStyle={{
                    background: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "12px",
                    padding: "12px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="loans"
                  stroke="#004E89"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorLoans)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card">
            <div className="chart-header">
              <h3 className="chart-title">Revenue Performance</h3>
              <span className="chart-badge">₹12.8M YTD</span>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={trendData}>
                <XAxis
                  dataKey="month"
                  stroke="#94a3b8"
                  tick={{ fill: "#64748b", fontSize: 12, fontWeight: 600 }}
                />
                <YAxis
                  stroke="#94a3b8"
                  tick={{ fill: "#64748b", fontSize: 12, fontWeight: 600 }}
                />
                <Tooltip
                  contentStyle={{
                    background: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "12px",
                    padding: "12px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#1FA883"
                  strokeWidth={3}
                  dot={{ fill: "#1FA883", r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* TEAM OVERVIEW */}
        <h2 className="section-title">Team Overview</h2>
        <div className="stats-grid">
          <StatCard
            icon="👥"
            label="Total Users"
            value={userStats.totalUsers}
            variant="total"
          />
          <StatCard
            icon="🎯"
            label="Agents"
            value={userStats.agents}
            variant="process"
          />
          <StatCard
            icon="📝"
            label="Data Operators"
            value={userStats.dataOperators}
            variant="disbursement"
          />
          <StatCard
            icon="🏦"
            label="Bank Executives"
            value={userStats.bankExecutives}
            variant="completed"
          />
        </div>

        {/* BANK OVERVIEW */}
        <h2 className="section-title">Bank Partners</h2>
        <div className="stats-grid">
          <StatCard
            icon="🏛️"
            label="Total Banks"
            value={totalBanks}
            variant="total"
          />
          <StatCard
            icon="✅"
            label="Active Banks"
            value={activeBanks}
            variant="completed"
          />
          <StatCard
            icon="⏸️"
            label="Inactive Banks"
            value={inactiveBanks}
            variant="rejected"
          />
          <StatCard
            icon="🏆"
            label="Top Bank"
            value={topBank}
            variant="disbursement"
            isText={true}
          />
        </div>

        {/* DOCUMENTATION */}
        <h2 className="section-title">Documentation Health</h2>
        <div className="stats-grid">
          <StatCard
            icon="⏰"
            label="Pending"
            value={docStats.pending}
            variant="process"
          />
          <StatCard
            icon="📤"
            label="Submitted"
            value={docStats.submitted}
            variant="disbursement"
          />
          <StatCard
            icon="✓"
            label="Verified"
            value={docStats.verified}
            variant="completed"
          />
          <StatCard
            icon="✗"
            label="Rejected"
            value={docStats.rejected}
            variant="rejected"
          />
        </div>

        {/* COMMISSION SNAPSHOT */}
        <h2 className="section-title">Commission Snapshot</h2>
        <div className="stats-grid">
          <StatCard
            icon="💰"
            label="Total Commission"
            value={`₹${totalCommission.toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`}
            variant="total"
            isText={true}
          />
          <StatCard
            icon="✅"
            label="Paid Commission"
            value={`₹${paidCommission.toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`}
            variant="completed"
            isText={true}
          />
          <StatCard
            icon="⏳"
            label="Pending Commission"
            value={`₹${pendingCommission.toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`}
            variant="process"
            isText={true}
          />
          <StatCard
            icon="📋"
            label="Disbursed Files"
            value={disbursedLoans.length}
            variant="disbursement"
          />
        </div>
      </div>
      </Layout>
    </>
  );
};

const StatCard = ({ icon, label, value, trend, trendUp, variant, isText }) => (
  <div className={`stat-card ${variant}`}>
    <div className="stat-icon">{icon}</div>
    <div className="stat-label">{label}</div>
    <div className="stat-value" style={isText ? { fontSize: '1.75rem', fontFamily: 'Plus Jakarta Sans' } : {}}>
      {value}
    </div>
    {trend && (
      <div className={`stat-trend ${trendUp ? "trend-up" : "trend-down"}`}>
        <span>{trendUp ? "↗" : "↘"}</span>
        <span>{trend} from last month</span>
      </div>
    )}
  </div>
);

export default AdminDashboard;