import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import Layout from "../../../Components/Layout";

/* ================= LOCAL HELPERS ================= */
const addActivity = (loanId, message) => {
  const activities = JSON.parse(localStorage.getItem("activities")) || [];
  activities.push({
    id: Date.now(),
    loanId,
    message,
    at: new Date().toISOString(),
  });
  localStorage.setItem("activities", JSON.stringify(activities));
};

const addNotification = (message) => {
  const notes = JSON.parse(localStorage.getItem("notifications")) || [];
  notes.push({
    id: Date.now(),
    message,
    at: new Date().toISOString(),
  });
  localStorage.setItem("notifications", JSON.stringify(notes));
};

/* ================= COMPONENT ================= */
const LoanDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loan, setLoan] = useState(null);
  const activityLogged = useRef(false);

  /* ===== LOAD LOAN ===== */
  useEffect(() => {
    const loans = JSON.parse(localStorage.getItem("loanFiles")) || [];
    const found = loans.find((l) => String(l.id) === String(id));

    if (found) {
      setLoan(found);

      if (!activityLogged.current) {
        addActivity(found.id, "Loan details opened");
        activityLogged.current = true;
      }
    }
  }, [id]);

  /* ===== UPDATE STATUS ===== */
  const updateStatus = (newStatus) => {
    const loans = JSON.parse(localStorage.getItem("loanFiles")) || [];

    const updated = loans.map((l) =>
      String(l.id) === String(id) ? { ...l, status: newStatus } : l
    );

    localStorage.setItem("loanFiles", JSON.stringify(updated));
    setLoan({ ...loan, status: newStatus });

    addActivity(id, `Status changed to ${newStatus}`);
    addNotification(`Loan #${id} status changed to ${newStatus}`);
  };

  const deleteLoan = () => {
    if (!window.confirm("Delete this loan file?")) return;

    const loans = JSON.parse(localStorage.getItem("loanFiles")) || [];
    const updated = loans.map((l) =>
      String(l.id) === String(id) ? { ...l, status: "Deleted" } : l
    );

    localStorage.setItem("loanFiles", JSON.stringify(updated));
    addActivity(id, "Loan file deleted");

    navigate("/admin/loan-files");
  };

  if (!loan) return <p style={{ padding: 24 }}>Loan not found</p>;

  return (
    <Layout>
      <style>{styles}</style>

      <div className="loan-page">
        {/* ===== BREADCRUMB ===== */}
        <div className="breadcrumb">
          <span onClick={() => navigate("/admin/dashboard")}>Dashboard</span>
          <span>›</span>
          <span onClick={() => navigate("/admin/loan-files")}>Loan Files</span>
          <span>›</span>
          <span>Loan Details</span>
        </div>

        {/* ===== HEADER ===== */}
        <div className="page-header">
          <div>
            <h1>Loan File Details</h1>
            <div className="loan-id">ID: {loan.id}</div>
          </div>

          <div className="header-actions">
            <button className="btn primary" onClick={() => navigate(`/admin/edit-loan/${loan.id}`)}>
              ✏ Edit
            </button>
            <button className="btn ghost" onClick={() => navigate(-1)}>
              ← Back
            </button>
          </div>
        </div>

        {/* ===== GRID ===== */}
        <div className="grid">
          {/* LEFT */}
          <div className="card">
            <h2>👤 Customer & Loan Information</h2>

            <Info label="Customer Name" value={loan.name} />
            <Info label="Email" value={loan.email} />
            <Info label="Phone" value={loan.phone} />
            <Info label="Loan Type" value={loan.loanType} />
            <Info label="Loan Amount" value={`₹ ${loan.amount}`} mono />
            <Info label="Bank Partner" value={loan.bankName} />
            <Info label="Status">
              <span className={`status ${loan.status.toLowerCase()}`}>
                ● {loan.status}
              </span>
            </Info>
            <Info label="Created By" value={loan.createdBy || "ADMIN"} />
          </div>

          {/* RIGHT */}
          <div className="card">
            <h2>⚡ Quick Actions</h2>

            {loan.status === "In-Process" && (
              <>
                <button className="action primary" onClick={() => updateStatus("Is-Disbursement")}>
                  💰 Move to Disbursement
                </button>
                <button className="action danger" onClick={() => updateStatus("Rejected")}>
                  ❌ Reject Loan
                </button>
              </>
            )}

            {loan.status === "Is-Disbursement" && (
              <button className="action success" onClick={() => updateStatus("Completed")}>
                ✅ Mark Completed
              </button>
            )}

            {loan.status !== "Completed" && loan.status !== "Rejected" && (
              <>
                <hr />
                <button className="action delete" onClick={deleteLoan}>
                  🗑 Delete Loan File
                </button>
              </>
            )}
          </div>
        </div>

        {/* ===== ACTIVITY ===== */}
        <div className="card">
          <h2>📋 Activity Timeline</h2>
          {(JSON.parse(localStorage.getItem("activities")) || [])
            .filter((a) => String(a.loanId) === String(id))
            .reverse()
            .map((a) => (
              <div key={a.id} className="activity">
                <small>{new Date(a.at).toLocaleString()}</small>
                <div>{a.message}</div>
              </div>
            ))}
        </div>
      </div>
    </Layout>
  );
};

/* ===== INFO ROW ===== */
const Info = ({ label, value, mono, children }) => (
  <div className="info-row">
    <span>{label}</span>
    <strong className={mono ? "mono" : ""}>{children || value}</strong>
  </div>
);

/* ================= STYLES ================= */
const styles = `
.loan-page { padding: 24px; }
.breadcrumb span { cursor:pointer; color:#64748b }
.page-header { display:flex; justify-content:space-between; margin:20px 0 }
.grid { display:grid; grid-template-columns: 2fr 360px; gap:24px }
.card { background:#fff; padding:24px; border-radius:16px; box-shadow:0 4px 12px rgba(0,0,0,.05) }
.info-row { display:flex; justify-content:space-between; padding:10px 0; border-bottom:1px solid #eee }
.status { font-weight:600 }
.action { width:100%; padding:12px; border-radius:10px; margin-top:10px; font-weight:600 }
.primary { background:#004E89; color:#fff }
.danger { background:#dc2626; color:#fff }
.success { background:#16a34a; color:#fff }
.delete { border:2px solid #fecaca; color:#dc2626; background:#fff }
@media (max-width: 900px) {
  .grid { grid-template-columns:1fr }
}
`;

export default LoanDetails;
