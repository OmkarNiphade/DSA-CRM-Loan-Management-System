import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const FileDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [file, setFile] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [remarks, setRemarks] = useState("");

  useEffect(() => {
    const allAssignments = JSON.parse(localStorage.getItem("executiveAssignments")) || [];
    const foundFile = allAssignments.find((a) => a.id === id);
    
    if (foundFile) {
      setFile(foundFile);
      setNewStatus(foundFile.assignment_status);
      setRemarks(foundFile.remarks || "");
    }
  }, [id]);

  const handleUpdateStatus = () => {
    const allAssignments = JSON.parse(localStorage.getItem("executiveAssignments")) || [];
    const updatedAssignments = allAssignments.map((a) => {
      if (a.id === id) {
        return {
          ...a,
          assignment_status: newStatus,
          remarks: remarks,
          last_updated: new Date().toISOString().split('T')[0],
        };
      }
      return a;
    });

    localStorage.setItem("executiveAssignments", JSON.stringify(updatedAssignments));
    alert("✅ Status updated successfully!");
    setShowUpdateModal(false);
    
    // Reload file data
    const updatedFile = updatedAssignments.find((a) => a.id === id);
    setFile(updatedFile);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (!file) {
    return (
      <div style={{ padding: "3rem", textAlign: "center" }}>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <><style>{`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

  .file-details-content {
    padding: 1.75rem;
    max-width: 1400px;
    margin: 0 auto;
    min-height: 100vh;
    background: #f8fafc;
  }

  /* Header */
  .page-header {
    background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
    padding: 1.75rem 2rem;
    border-radius: 12px;
    margin-bottom: 1.75rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }

  .back-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.4rem 0.875rem;
    background: rgba(255, 255, 255, 0.15);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 6px;
    font-weight: 600;
    font-size: 0.85rem;
    cursor: pointer;
    margin-bottom: 1rem;
    transition: all 0.2s;
  }

  .back-btn:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: translateX(-3px);
  }

  .page-title {
    font-size: 1.75rem;
    font-weight: 700;
    color: white;
    margin: 0 0 0.5rem 0;
    letter-spacing: -0.02em;
  }

  .file-id-badge {
    display: inline-block;
    background: rgba(255, 255, 255, 0.15);
    color: white;
    padding: 0.35rem 0.875rem;
    border-radius: 6px;
    font-family: 'Courier New', monospace;
    font-weight: 700;
    font-size: 0.85rem;
    letter-spacing: 0.5px;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  /* Content Layout - Main content left, sidebar right */
  .content-layout {
    display: grid;
    grid-template-columns: 1fr 380px;
    gap: 1.75rem;
  }

  /* Info Cards */
  .info-card {
    background: white;
    padding: 1.75rem;
    border-radius: 12px;
    border: 1px solid #e5e7eb;
    margin-bottom: 1.75rem;
  }

  .card-title {
    font-size: 1rem;
    font-weight: 700;
    color: #111827;
    margin: 0 0 1.25rem 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #f3f4f6;
  }

  .info-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }

  .info-item {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
  }

  .info-label {
    font-size: 0.7rem;
    font-weight: 700;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.8px;
  }

  .info-value {
    font-size: 0.925rem;
    font-weight: 600;
    color: #111827;
  }

  .info-divider {
    height: 1px;
    background: #e5e7eb;
    margin: 0.25rem 0;
  }

  /* Sidebar */
  .sidebar {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  /* Status Card */
  .status-card {
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    border: 1px solid #e5e7eb;
    margin-bottom: 1.25rem;
  }

  .status-card-title {
    font-size: 0.75rem;
    font-weight: 700;
    color: #6b7280;
    margin: 0 0 1rem 0;
    text-transform: uppercase;
    letter-spacing: 0.8px;
  }

  .status-badge-large {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.875rem 1.25rem;
    border-radius: 8px;
    font-size: 0.85rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    width: 100%;
  }

  .status-active {
    background: #dbeafe;
    color: #1e40af;
    border: 2px solid #93c5fd;
  }

  .status-pending {
    background: #fef3c7;
    color: #92400e;
    border: 2px solid #fcd34d;
  }

  .status-completed {
    background: #d1fae5;
    color: #065f46;
    border: 2px solid #6ee7b7;
  }

  /* Actions Card */
  .actions-card {
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    border: 1px solid #e5e7eb;
  }

  .actions-title {
    font-size: 0.925rem;
    font-weight: 700;
    color: #111827;
    margin: 0 0 1rem 0;
  }

  .action-btn {
    width: 100%;
    padding: 0.75rem 1rem;
    border: none;
    border-radius: 8px;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
  }

  .action-btn:last-child {
    margin-bottom: 0;
  }

  .btn-update {
    background: #3b82f6;
    color: white;
  }

  .btn-update:hover {
    background: #2563eb;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(59, 130, 246, 0.3);
  }

  .btn-back {
    background: #f3f4f6;
    color: #4b5563;
    border: 1px solid #e5e7eb;
  }

  .btn-back:hover {
    background: #e5e7eb;
  }

  /* Modal */
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
    backdrop-filter: blur(4px);
  }

  .modal {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    max-width: 500px;
    width: 90%;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
  }

  .modal-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #111827;
    margin: 0 0 1.5rem 0;
  }

  .modal-form-group {
    margin-bottom: 1.5rem;
  }

  .modal-label {
    display: block;
    font-size: 0.8rem;
    font-weight: 700;
    color: #374151;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .modal-select,
  .modal-textarea {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 500;
    transition: all 0.2s;
    background: #f9fafb;
  }

  .modal-select:focus,
  .modal-textarea:focus {
    outline: none;
    border-color: #3b82f6;
    background: white;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  .modal-textarea {
    resize: vertical;
    min-height: 100px;
    font-family: 'Inter', sans-serif;
  }

  .modal-actions {
    display: flex;
    gap: 0.875rem;
  }

  .modal-btn {
    flex: 1;
    padding: 0.875rem 1rem;
    border: none;
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }

  .modal-btn-primary {
    background: #3b82f6;
    color: white;
  }

  .modal-btn-primary:hover {
    background: #2563eb;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(59, 130, 246, 0.3);
  }

  .modal-btn-secondary {
    background: #f3f4f6;
    color: #4b5563;
    border: 1px solid #e5e7eb;
  }

  .modal-btn-secondary:hover {
    background: #e5e7eb;
  }

  /* Responsive */
  @media (max-width: 1200px) {
    .content-layout {
      grid-template-columns: 1fr;
    }

    .sidebar {
      order: 1;
    }

    .main-content {
      order: 2;
    }
  }

  @media (max-width: 768px) {
    .file-details-content {
      padding: 1rem;
    }

    .page-title {
      font-size: 1.5rem;
    }

    .info-card {
      padding: 1.25rem;
    }
  }
`}</style>
      <div className="file-details-content">
        {/* Header */}
        <div className="page-header">
          <button className="back-btn" onClick={() => navigate("/bank-executive/my-files")}>
            <span>←</span>
            <span>Back to Files</span>
          </button>
          <h1 className="page-title">📋 File Details</h1>
          <div className="file-id-badge">{file.assignment_id}</div>
        </div>

        <div className="content-layout">
          {/* Main Content */}
          <div>
            {/* Customer & File Info */}
            <div className="info-card">
              <h2 className="card-title">
                <span>👤</span>
                <span>Customer & File Information</span>
              </h2>

              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">File ID</span>
                  <span className="info-value">{file.file_id}</span>
                </div>

                <div className="info-item">
                  <span className="info-label">Assignment ID</span>
                  <span className="info-value">{file.assignment_id}</span>
                </div>

                <div className="info-divider"></div>

                <div className="info-item">
                  <span className="info-label">Customer Name</span>
                  <span className="info-value">{file.customer_name}</span>
                </div>

                <div className="info-item">
                  <span className="info-label">Bank Name</span>
                  <span className="info-value">{file.bank_name}</span>
                </div>

                <div className="info-divider"></div>

                <div className="info-item">
                  <span className="info-label">Loan Type</span>
                  <span className="info-value">{file.loan_type}</span>
                </div>

                <div className="info-item">
                  <span className="info-label">Loan Amount</span>
                  <span className="info-value">{formatCurrency(file.loan_amount)}</span>
                </div>

                <div className="info-divider"></div>

                <div className="info-item">
                  <span className="info-label">Assigned Date</span>
                  <span className="info-value">{file.assigned_date}</span>
                </div>

                {file.last_updated && (
                  <div className="info-item">
                    <span className="info-label">Last Updated</span>
                    <span className="info-value">{file.last_updated}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Remarks */}
            <div className="info-card">
              <h2 className="card-title">
                <span>📝</span>
                <span>Remarks & Notes</span>
              </h2>

              <div className="info-item">
                <span className="info-label">Remarks</span>
                <span className="info-value">{file.remarks || "No remarks added"}</span>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="sidebar">
            {/* Status Card */}
            <div className="status-card">
              <h3 className="status-card-title">Current Status</h3>
              <div className={`status-badge-large status-${file.assignment_status.toLowerCase()}`}>
                <span>●</span>
                <span>{file.assignment_status}</span>
              </div>
            </div>

            {/* Actions Card */}
            <div className="actions-card">
              <h3 className="actions-title">Quick Actions</h3>

              <button className="action-btn btn-update" onClick={() => navigate("/bank-executive/update-status")}>
                <span>🔄</span>
                <span>Update Status</span>
              </button>

              <button
                className="action-btn btn-back"
                onClick={() => navigate("/bank-executive/my-files")}
              >
                <span>←</span>
                <span>Back to Files</span>
              </button>
            </div>
          </div>
        </div>

        {/* Update Status Modal */}
        {showUpdateModal && (
          <div className="modal-overlay" onClick={() => setShowUpdateModal(false)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <h2 className="modal-title">Update File Status</h2>

              <div className="modal-form-group">
                <label className="modal-label">Select New Status</label>
                <select
                  className="modal-select"
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                >
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div className="modal-form-group">
                <label className="modal-label">Remarks (Optional)</label>
                <textarea
                  className="modal-textarea"
                  placeholder="Add notes or comments..."
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                />
              </div>

              <div className="modal-actions">
                <button className="modal-btn modal-btn-primary" onClick={handleUpdateStatus}>
                  ✅ Update Status
                </button>
                <button
                  className="modal-btn modal-btn-secondary"
                  onClick={() => setShowUpdateModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FileDetails;