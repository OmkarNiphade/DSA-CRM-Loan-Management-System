import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const ExecutiveUpdateStatus = () => {
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || {};
  const executiveEmail = loggedInUser.email || "";
  
  const [myFiles, setMyFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [remarks, setRemarks] = useState("");

  useEffect(() => {
    const allAssignments = JSON.parse(localStorage.getItem("executiveAssignments")) || [];
    const executiveName = loggedInUser.name || loggedInUser.email?.split("@")[0];
    
    const filteredFiles = allAssignments.filter(
      (assignment) => 
        assignment.executive_email === executiveEmail ||
        assignment.executive_name?.toLowerCase().includes(executiveName?.toLowerCase())
    );
    
    setMyFiles(filteredFiles);
  }, [executiveEmail, loggedInUser.name]);

  const handleFileSelect = (e) => {
    const fileId = e.target.value;
    const file = myFiles.find(f => f.id === fileId);
    setSelectedFile(file || null);
    setNewStatus(file?.assignment_status || "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedFile) {
      alert("Please select a file");
      return;
    }

    const allAssignments = JSON.parse(localStorage.getItem("executiveAssignments")) || [];
    const updatedAssignments = allAssignments.map((a) => {
      if (a.id === selectedFile.id) {
        return {
          ...a,
          assignment_status: newStatus,
          remarks: remarks || a.remarks,
          last_updated: new Date().toISOString().split('T')[0],
        };
      }
      return a;
    });

    localStorage.setItem("executiveAssignments", JSON.stringify(updatedAssignments));
    alert("✅ Status updated successfully!");
    
    // Reset form
    setSelectedFile(null);
    setNewStatus("");
    setRemarks("");
    
    // Reload files
    const executiveName = loggedInUser.name || loggedInUser.email?.split("@")[0];
    const filteredFiles = updatedAssignments.filter(
      (assignment) => 
        assignment.executive_email === executiveEmail ||
        assignment.executive_name?.toLowerCase().includes(executiveName?.toLowerCase())
    );
    setMyFiles(filteredFiles);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        
        .update-status-container {
          font-family: 'Inter', sans-serif;
          min-height: 100vh;
          padding: 2rem;
          background: #f1f5f9;
        }
        
        .page-header {
          background: linear-gradient(135deg, #667eea, #764ba2);
          padding: 2.5rem 2rem;
          border-radius: 16px;
          margin-bottom: 2rem;
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
        }
        
        .back-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          margin-bottom: 1rem;
          transition: all 0.2s;
        }
        
        .back-btn:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateX(-3px);
        }
        
        .page-title {
          font-size: 2rem;
          font-weight: 900;
          color: white;
          margin: 0 0 0.5rem 0;
        }
        
        .page-subtitle {
          color: rgba(255, 255, 255, 0.9);
          font-size: 1rem;
        }
        
        .form-layout {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 2rem;
        }
        
        .form-card {
          background: white;
          padding: 2.5rem;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
        }
        
        .form-card-title {
          font-size: 1.5rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0 0 2rem 0;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        
        .form-group {
          margin-bottom: 2rem;
        }
        
        .form-label {
          display: block;
          font-size: 0.875rem;
          font-weight: 700;
          color: #334155;
          margin-bottom: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .required {
          color: #ef4444;
        }
        
        .form-select,
        .form-textarea {
          width: 100%;
          padding: 1rem 1.25rem;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          font-size: 0.95rem;
          font-weight: 500;
          transition: all 0.3s;
          background: #f8fafc;
          color: #0f172a;
        }
        
        .form-select:focus,
        .form-textarea:focus {
          outline: none;
          border-color: #667eea;
          background: white;
          box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
        }
        
        .form-textarea {
          resize: vertical;
          min-height: 100px;
        }
        
        .preview-card {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 2rem;
          border-radius: 16px;
          color: white;
          box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);
        }
        
        .preview-title {
          font-size: 1rem;
          font-weight: 700;
          margin: 0 0 1.5rem 0;
          opacity: 0.9;
          text-transform: uppercase;
        }
        
        .preview-item {
          margin-bottom: 1rem;
        }
        
        .preview-label {
          font-size: 0.75rem;
          opacity: 0.8;
          margin-bottom: 0.25rem;
        }
        
        .preview-value {
          font-size: 1rem;
          font-weight: 700;
        }
        
        .preview-divider {
          height: 1px;
          background: rgba(255, 255, 255, 0.2);
          margin: 1rem 0;
        }
        
        .empty-preview {
          text-align: center;
          padding: 3rem 2rem;
          opacity: 0.7;
        }
        
        .empty-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }
        
        .form-actions {
          display: flex;
          gap: 1rem;
          margin-top: 2rem;
        }
        
        .btn {
          padding: 1rem 2rem;
          border: none;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s;
          text-transform: uppercase;
        }
        
        .btn-primary {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          flex: 1;
        }
        
        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 35px rgba(102, 126, 234, 0.4);
        }
        
        .btn-secondary {
          background: white;
          color: #64748b;
          border: 2px solid #e2e8f0;
        }
        
        .btn-secondary:hover {
          background: #f8fafc;
          transform: translateY(-2px);
        }
        
        @media (max-width: 1200px) {
          .form-layout {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="update-status-container">
        <div className="page-header">
          <button className="back-btn" onClick={() => navigate("/bank-executive")}>
            <span>←</span>
            <span>Back to Dashboard</span>
          </button>
          <h1 className="page-title">🔄 Update Status</h1>
          <p className="page-subtitle">Update the status of your assigned files</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-layout">
            <div className="form-card">
              <h2 className="form-card-title">
                <span>📝</span>
                <span>Status Update Form</span>
              </h2>

              <div className="form-group">
                <label className="form-label">
                  Select File <span className="required">*</span>
                </label>
                <select
                  className="form-select"
                  value={selectedFile?.id || ""}
                  onChange={handleFileSelect}
                  required
                >
                  <option value="">-- Choose a file --</option>
                  {myFiles.map((file) => (
                    <option key={file.id} value={file.id}>
                      {file.file_id} - {file.customer_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">
                  New Status <span className="required">*</span>
                </label>
                <select
                  className="form-select"
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  required
                  disabled={!selectedFile}
                >
                  <option value="">-- Select status --</option>
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Remarks (Optional)</label>
                <textarea
                  className="form-textarea"
                  placeholder="Add any notes or comments..."
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  disabled={!selectedFile}
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary" disabled={!selectedFile}>
                  ✅ Update Status
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => navigate("/bank-executive")}
                >
                  Cancel
                </button>
              </div>
            </div>

            <div className="preview-card">
              <h3 className="preview-title">📄 File Preview</h3>

              {selectedFile ? (
                <>
                  <div className="preview-item">
                    <div className="preview-label">File ID</div>
                    <div className="preview-value">{selectedFile.file_id}</div>
                  </div>

                  <div className="preview-divider"></div>

                  <div className="preview-item">
                    <div className="preview-label">Customer</div>
                    <div className="preview-value">{selectedFile.customer_name}</div>
                  </div>

                  <div className="preview-item">
                    <div className="preview-label">Bank</div>
                    <div className="preview-value">{selectedFile.bank_name}</div>
                  </div>

                  <div className="preview-divider"></div>

                  <div className="preview-item">
                    <div className="preview-label">Loan Type</div>
                    <div className="preview-value">{selectedFile.loan_type}</div>
                  </div>

                  <div className="preview-item">
                    <div className="preview-label">Amount</div>
                    <div className="preview-value">{formatCurrency(selectedFile.loan_amount)}</div>
                  </div>

                  <div className="preview-divider"></div>

                  <div className="preview-item">
                    <div className="preview-label">Current Status</div>
                    <div className="preview-value">{selectedFile.assignment_status}</div>
                  </div>
                </>
              ) : (
                <div className="empty-preview">
                  <div className="empty-icon">📁</div>
                  <p>Select a file to see details</p>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ExecutiveUpdateStatus;