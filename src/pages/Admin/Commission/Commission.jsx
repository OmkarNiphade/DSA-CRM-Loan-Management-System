import { useState, useEffect } from "react";
import Layout from "../../../Components/Layout";

const Commission = () => {
  const defaultCommissions = [
    {
      id: 1,
      commission_id: "COM001",
      file_id: "1767247481626",
      customer_name: "Kaustubh Somnath Pawar",
      bank_name: "HDFC Bank",
      loan_type: "Personal Loan",
      loan_amount: 500000,
      commission_percentage: 2.5,
      commission_amount: 12500,
      payment_status: "Paid",
      payment_date: "2025-01-20",
      payment_mode: "Bank Transfer",
      assigned_to: "Admin User",
      disbursement_date: "2025-01-15",
      remarks: "Commission paid successfully",
    },
    {
      id: 2,
      commission_id: "COM002",
      file_id: "1767169783336",
      customer_name: "Mina Somnath Pawar",
      bank_name: "ICICI Bank",
      loan_type: "Vehicle Loan",
      loan_amount: 800000,
      commission_percentage: 2.0,
      commission_amount: 16000,
      payment_status: "Pending",
      payment_date: null,
      payment_mode: null,
      assigned_to: "Admin User",
      disbursement_date: "2025-01-18",
      remarks: "Awaiting disbursement confirmation",
    },
    {
      id: 3,
      commission_id: "COM003",
      file_id: "1767155968881",
      customer_name: "Sakshi Niphade",
      bank_name: "State Bank of India",
      loan_type: "Home Loan",
      loan_amount: 2500000,
      commission_percentage: 1.5,
      commission_amount: 37500,
      payment_status: "Processing",
      payment_date: null,
      payment_mode: null,
      assigned_to: "Admin User",
      disbursement_date: "2025-01-10",
      remarks: "Payment in process",
    },
    {
      id: 4,
      commission_id: "COM004",
      file_id: "1767155383885",
      customer_name: "Kaustubh Somnath Pawar",
      bank_name: "Axis Bank",
      loan_type: "Business Loan",
      loan_amount: 1500000,
      commission_percentage: 3.0,
      commission_amount: 45000,
      payment_status: "Paid",
      payment_date: "2025-01-22",
      payment_mode: "UPI",
      assigned_to: "Admin User",
      disbursement_date: "2025-01-12",
      remarks: "Commission disbursed via UPI",
    },
  ];

  useEffect(() => {
    const existing = localStorage.getItem("commissions");
    if (!existing) {
      localStorage.setItem("commissions", JSON.stringify(defaultCommissions));
    }
  }, []);

  const allCommissions = JSON.parse(localStorage.getItem("commissions")) || [];
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredCommissions = allCommissions.filter((comm) => {
    const matchesSearch =
      comm.commission_id?.toLowerCase().includes(search.toLowerCase()) ||
      comm.customer_name?.toLowerCase().includes(search.toLowerCase()) ||
      comm.bank_name?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || comm.payment_status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: allCommissions.reduce((sum, c) => sum + c.commission_amount, 0),
    paid: allCommissions.filter((c) => c.payment_status === "Paid").reduce((sum, c) => sum + c.commission_amount, 0),
    pending: allCommissions.filter((c) => c.payment_status === "Pending").reduce((sum, c) => sum + c.commission_amount, 0),
    count: {
      paid: allCommissions.filter((c) => c.payment_status === "Paid").length,
      pending: allCommissions.filter((c) => c.payment_status === "Pending").length,
    },
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleMarkAsPaid = (commissionId) => {
    const paymentMode = prompt("Select Payment Mode:\n1. Bank Transfer\n2. UPI\n3. Cash\n4. Cheque");
    if (!paymentMode) return;
    const modes = { "1": "Bank Transfer", "2": "UPI", "3": "Cash", "4": "Cheque" };
    const mode = modes[paymentMode] || "Bank Transfer";
    const commissions = JSON.parse(localStorage.getItem("commissions")) || [];
    const idx = commissions.findIndex((c) => c.id === commissionId);
    if (idx !== -1) {
      commissions[idx] = {
        ...commissions[idx],
        payment_status: "Paid",
        payment_mode: mode,
        payment_date: new Date().toISOString().split("T")[0],
        remarks: `Paid via ${mode}`,
      };
      localStorage.setItem("commissions", JSON.stringify(commissions));
      alert("✅ Commission marked as paid!");
      window.location.reload();
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      Paid: { bg: "#ecfdf5", text: "#065f46", border: "#10b981" },
      Pending: { bg: "#fef3c7", text: "#92400e", border: "#f59e0b" },
      Processing: { bg: "#dbeafe", text: "#1e40af", border: "#3b82f6" },
    };
    return colors[status] || colors.Pending;
  };

  return (
    <Layout>
    <div style={{ padding: "24px", maxWidth: "1400px", margin: "0 auto", background: "#f9fafb", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
          <div>
            <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#111827", margin: "0 0 8px 0" }}>
              Commission Management
            </h1>
            <p style={{ fontSize: "14px", color: "#6b7280", margin: 0 }}>
              Track and manage commission payments
            </p>
          </div>
          <button
            onClick={() => (window.location.href = "/admin/add-commission")}
            style={{
              padding: "12px 24px",
              background: "#10b981",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
            }}
          >
            <span style={{ fontSize: "18px" }}>+</span>
            Add Commission
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px", marginBottom: "24px" }}>
        {[
          { label: "Total Commission", value: formatCurrency(stats.total), icon: "💰", color: "#8b5cf6" },
          { label: "Paid Amount", value: formatCurrency(stats.paid), icon: "✅", color: "#10b981", count: `${stats.count.paid} paid` },
          { label: "Pending Amount", value: formatCurrency(stats.pending), icon: "⏳", color: "#f59e0b", count: `${stats.count.pending} pending` },
          { label: "Success Rate", value: `${Math.round((stats.count.paid / allCommissions.length) * 100)}%`, icon: "📈", color: "#3b82f6" },
        ].map((stat, idx) => (
          <div
            key={idx}
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "12px",
              border: "1px solid #e5e7eb",
              boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: `${stat.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>
                {stat.icon}
              </div>
              {stat.count && (
                <span style={{ fontSize: "11px", fontWeight: "600", color: "#6b7280", background: "#f3f4f6", padding: "4px 8px", borderRadius: "6px" }}>
                  {stat.count}
                </span>
              )}
            </div>
            <div style={{ fontSize: "11px", fontWeight: "600", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "6px" }}>
              {stat.label}
            </div>
            <div style={{ fontSize: "24px", fontWeight: "700", color: "#111827" }}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ background: "white", padding: "16px 20px", borderRadius: "12px", border: "1px solid #e5e7eb", marginBottom: "20px", display: "flex", gap: "12px", alignItems: "center" }}>
        <div style={{ flex: 1, position: "relative" }}>
          <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", fontSize: "18px" }}>🔍</span>
          <input
            type="text"
            placeholder="Search by commission ID, customer, or bank..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 10px 10px 40px",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              fontSize: "14px",
              outline: "none",
              background: "white",
              color: "#111827"
            }}
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{
            padding: "10px 16px",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "500",
            cursor: "pointer",
            outline: "none",
            minWidth: "150px",
            background: "white",
            color: "#111827"
          }}
        >
          <option value="All">All Status</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
        </select>
      </div>

      {/* Table */}
      <div style={{ background: "white", borderRadius: "12px", border: "1px solid #e5e7eb", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f9fafb", borderBottom: "1px solid #e5e7eb" }}>
              {["ID", "Customer", "Bank", "Loan Details", "Commission", "Date", "Status", "Actions"].map((header) => (
                <th key={header} style={{ padding: "12px 16px", textAlign: "left", fontSize: "11px", fontWeight: "600", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredCommissions.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ padding: "60px", textAlign: "center" }}>
                  <div style={{ fontSize: "48px", marginBottom: "12px" }}>📊</div>
                  <div style={{ fontSize: "16px", fontWeight: "600", color: "#111827", marginBottom: "4px" }}>No commissions found</div>
                  <div style={{ fontSize: "14px", color: "#6b7280" }}>Try adjusting your search or filters</div>
                </td>
              </tr>
            ) : (
              filteredCommissions.map((comm) => {
                const statusColor = getStatusColor(comm.payment_status);
                return (
                  <tr key={comm.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                    <td style={{ padding: "16px", fontSize: "13px", fontWeight: "600", color: "#111827", fontFamily: "monospace" }}>
                      {comm.commission_id}
                    </td>
                    <td style={{ padding: "16px" }}>
                      <div style={{ fontSize: "14px", fontWeight: "600", color: "#111827", marginBottom: "2px" }}>
                        {comm.customer_name}
                      </div>
                      <div style={{ fontSize: "12px", color: "#6b7280" }}>ID: {comm.file_id}</div>
                    </td>
                    <td style={{ padding: "16px", fontSize: "13px", fontWeight: "500", color: "#374151" }}>
                      {comm.bank_name}
                    </td>
                    <td style={{ padding: "16px" }}>
                      <div style={{ fontSize: "13px", fontWeight: "600", color: "#111827", marginBottom: "2px" }}>
                        {comm.loan_type}
                      </div>
                      <div style={{ fontSize: "12px", color: "#6b7280", fontFamily: "monospace" }}>
                        {formatCurrency(comm.loan_amount)}
                      </div>
                    </td>
                    <td style={{ padding: "16px" }}>
                      <div style={{ fontSize: "16px", fontWeight: "700", color: "#10b981", fontFamily: "monospace", marginBottom: "2px" }}>
                        {formatCurrency(comm.commission_amount)}
                      </div>
                      <div style={{ fontSize: "11px", color: "#6b7280", fontWeight: "600" }}>
                        {comm.commission_percentage}% rate
                      </div>
                    </td>
                    <td style={{ padding: "16px", fontSize: "13px", color: "#374151" }}>
                      {comm.disbursement_date}
                    </td>
                    <td style={{ padding: "16px" }}>
                      <span
                        style={{
                          display: "inline-block",
                          padding: "6px 12px",
                          borderRadius: "6px",
                          fontSize: "12px",
                          fontWeight: "600",
                          background: statusColor.bg,
                          color: statusColor.text,
                          border: `1px solid ${statusColor.border}20`,
                        }}
                      >
                        {comm.payment_status}
                      </span>
                    </td>
                    <td style={{ padding: "16px" }}>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button
                          onClick={() => (window.location.href = `/admin/commission/${comm.id}`)}
                          style={{
                            padding: "6px 12px",
                            background: "#f9fafb",
                            border: "1px solid #e5e7eb",
                            borderRadius: "6px",
                            fontSize: "13px",
                            fontWeight: "600",
                            color: "#374151",
                            cursor: "pointer",
                          }}
                        >
                          View
                        </button>
                        {comm.payment_status === "Pending" && (
                          <button
                            onClick={() => handleMarkAsPaid(comm.id)}
                            style={{
                              padding: "6px 12px",
                              background: "#10b981",
                              border: "none",
                              borderRadius: "6px",
                              fontSize: "13px",
                              fontWeight: "600",
                              color: "white",
                              cursor: "pointer",
                            }}
                          >
                            Pay
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          
          </tbody>
        </table>
      </div>
    </div>
    </Layout>
  );
};

export default Commission;