import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../../Components/Layout";

const AddCommission = () => {
  const navigate = useNavigate();

  /* ---------------- FORM STATE ---------------- */
  const [formData, setFormData] = useState({
    file_id: "",
    commission_percentage: "",
    payment_status: "Pending",
    payment_mode: "",
    remarks: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loanFiles, setLoanFiles] = useState([]);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [calculatedCommission, setCalculatedCommission] = useState(0);

  /* ---------------- LOAD DATA ---------------- */
  useEffect(() => {
    const storedLoans = JSON.parse(localStorage.getItem("loanFiles")) || [];
    console.log("All Loans:", storedLoans);
    // Show all loans for now (remove filter if needed)
    setLoanFiles(storedLoans);
  }, []);

  /* ---------------- HANDLE INPUT CHANGE ---------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    // Handle loan file selection
    if (name === "file_id") {
      const loan = loanFiles.find((l) => String(l.id) === String(value));
      console.log("Selected Loan:", loan);
      setSelectedLoan(loan);
      
      // Auto-calculate commission if percentage is set
      if (formData.commission_percentage && loan) {
        const loanAmount = parseFloat(loan.amount || loan.loanAmount || 0);
        const percentage = parseFloat(formData.commission_percentage);
        const amount = (loanAmount * percentage) / 100;
        console.log("Calculated:", { loanAmount, percentage, amount });
        setCalculatedCommission(amount);
      }
    }

    // Handle percentage change
    if (name === "commission_percentage" && value) {
      if (selectedLoan) {
        const loanAmount = parseFloat(selectedLoan.amount || selectedLoan.loanAmount || 0);
        const percentage = parseFloat(value);
        const amount = (loanAmount * percentage) / 100;
        console.log("Calculated:", { loanAmount, percentage, amount });
        setCalculatedCommission(amount);
      }
    }

    // Reset calculation if percentage is cleared
    if (name === "commission_percentage" && !value) {
      setCalculatedCommission(0);
    }
  };

  /* ---------------- VALIDATION ---------------- */
  const validate = () => {
    const newErrors = {};

    if (!formData.file_id) {
      newErrors.file_id = "Please select a loan file";
    }

    if (!formData.commission_percentage) {
      newErrors.commission_percentage = "Commission percentage is required";
    } else if (
      parseFloat(formData.commission_percentage) < 0 ||
      parseFloat(formData.commission_percentage) > 10
    ) {
      newErrors.commission_percentage = "Percentage must be between 0 and 10";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ---------------- HANDLE SUBMIT ---------------- */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    // Get existing commissions
    const commissions = JSON.parse(localStorage.getItem("commissions")) || [];

    // Create new commission object
    const newCommission = {
      id: commissions.length > 0 ? Math.max(...commissions.map((c) => c.id)) + 1 : 1,
      commission_id: `COM${String(commissions.length + 1).padStart(3, "0")}`,
      file_id: formData.file_id,
      customer_name: selectedLoan?.customerName || selectedLoan?.customer_name || "Unknown",
      bank_name: selectedLoan?.bankName || selectedLoan?.bank_name || "Unknown",
      loan_type: selectedLoan?.loanType || selectedLoan?.loan_type || "Unknown",
      loan_amount: parseFloat(selectedLoan?.amount || selectedLoan?.loanAmount || 0),
      commission_percentage: parseFloat(formData.commission_percentage),
      commission_amount: calculatedCommission,
      payment_status: formData.payment_status,
      payment_date: formData.payment_status === "Paid" ? new Date().toISOString().split("T")[0] : null,
      payment_mode: formData.payment_mode || null,
      assigned_to: "Admin User",
      disbursement_date: selectedLoan?.disbursementDate || selectedLoan?.disbursement_date || new Date().toISOString().split("T")[0],
      remarks: formData.remarks.trim() || "Commission entry created",
    };

    // Add new commission
    commissions.push(newCommission);
    localStorage.setItem("commissions", JSON.stringify(commissions));

    // Show success message
    alert("Commission added successfully!");

    // Redirect to commission list
    setTimeout(() => {
      setIsSubmitting(false);
      navigate("/admin/commission");
    }, 500);
  };

  /* ---------------- HANDLE CANCEL ---------------- */
  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel? All data will be lost.")) {
      navigate("/admin/commission");
    }
  };

  /* ---------------- FORMAT CURRENCY ---------------- */
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount || 0);
  };

  // Debug log
  console.log("State:", {
    selectedLoan,
    percentage: formData.commission_percentage,
    calculated: calculatedCommission,
    shouldShowCalculator: !!(selectedLoan && formData.commission_percentage)
  });

  return (
    <>
    <Layout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');

        .add-commission-container {
          font-family: 'Inter', sans-serif;
          padding: 2rem;
          background: #f8fafc;
          min-height: 100vh;
        }

        .page-header {
          margin-bottom: 2rem;
        }

        .header-top {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 0.5rem;
        }

        .back-btn {
          padding: 0.5rem 0.75rem;
          background: white;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          cursor: pointer;
          font-size: 1rem;
          transition: all 0.3s;
        }

        .back-btn:hover {
          background: #f8fafc;
          border-color: #cbd5e1;
        }

        .page-title {
          font-size: 2rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0;
          letter-spacing: -0.02em;
        }

        .page-subtitle {
          color: #64748b;
          font-size: 0.95rem;
          margin: 0;
        }

        .form-card {
          background: white;
          border-radius: 12px;
          padding: 2rem;
          border: 1px solid #e2e8f0;
        }

        .info-box {
          background: linear-gradient(135deg, #d1fae5, #a7f3d0);
          border: 1px solid #10b981;
          border-radius: 10px;
          padding: 1rem;
          margin-bottom: 2rem;
        }

        .info-box-title {
          font-size: 0.875rem;
          font-weight: 700;
          color: #065f46;
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .info-box-text {
          font-size: 0.8rem;
          color: #047857;
          line-height: 1.5;
          margin: 0;
        }

        .form-section {
          margin-bottom: 2rem;
        }

        .section-title {
          font-size: 1.125rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid #e2e8f0;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group.full-width {
          grid-column: 1 / -1;
        }

        .form-label {
          font-size: 0.875rem;
          font-weight: 600;
          color: #334155;
        }

        .required {
          color: #DC2626;
          margin-left: 0.25rem;
        }

        .form-input,
        .form-select,
        .form-textarea {
          padding: 0.875rem;
          border: 2px solid #e2e8f0;
          border-radius: 10px;
          font-size: 0.9rem;
          font-family: 'Inter', sans-serif;
          transition: all 0.3s;
          background: white;
        }

        .form-input:focus,
        .form-select:focus,
        .form-textarea:focus {
          outline: none;
          border-color: #10b981;
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
        }

        .form-input.error,
        .form-select.error {
          border-color: #DC2626;
        }

        .form-textarea {
          resize: vertical;
          min-height: 100px;
        }

        .error-message {
          font-size: 0.8rem;
          color: #DC2626;
          margin-top: 0.25rem;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .input-hint {
          font-size: 0.8rem;
          color: #64748b;
          margin-top: 0.25rem;
        }

        /* Loan Info Display */
        .loan-info-card {
          background: linear-gradient(135deg, #f8fafc, #f1f5f9);
          border: 2px solid #e2e8f0;
          border-radius: 10px;
          padding: 1.5rem;
          margin-top: 1rem;
        }

        .loan-info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .loan-info-item {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .loan-info-label {
          font-size: 0.75rem;
          font-weight: 600;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .loan-info-value {
          font-size: 0.95rem;
          font-weight: 600;
          color: #0f172a;
        }

        .loan-amount {
          font-size: 1.25rem;
          font-weight: 800;
          color: #10b981;
          font-family: 'JetBrains Mono', monospace;
        }

        /* Commission Calculator */
        .calculator-card {
          background: linear-gradient(135deg, #10b981, #059669);
          border-radius: 12px;
          padding: 2rem;
          color: white;
          margin-top: 1.5rem;
          box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
          animation: slideIn 0.5s ease-out;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .calculator-title {
          font-size: 0.875rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 1rem;
          opacity: 0.9;
        }

        .calculator-amount {
          font-size: 3rem;
          font-weight: 800;
          font-family: 'JetBrains Mono', monospace;
          margin-bottom: 0.5rem;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .calculator-formula {
          font-size: 0.95rem;
          opacity: 0.9;
          font-family: 'JetBrains Mono', monospace;
        }

        .form-actions {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
          padding-top: 2rem;
          border-top: 2px solid #e2e8f0;
        }

        .btn {
          padding: 0.875rem 1.75rem;
          border: none;
          border-radius: 10px;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          font-family: 'Inter', sans-serif;
        }

        .btn-primary {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        }

        .btn-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(16, 185, 129, 0.4);
        }

        .btn-primary:disabled {
          background: #94a3b8;
          cursor: not-allowed;
          transform: none;
        }

        .btn-secondary {
          background: white;
          color: #64748b;
          border: 2px solid #e2e8f0;
        }

        .btn-secondary:hover {
          background: #f8fafc;
          border-color: #cbd5e1;
        }

        @media (max-width: 768px) {
          .add-commission-container {
            padding: 1rem;
          }

          .form-grid,
          .loan-info-grid {
            grid-template-columns: 1fr;
          }

          .form-card {
            padding: 1.5rem;
          }

          .form-actions {
            flex-direction: column-reverse;
          }

          .btn {
            width: 100%;
          }

          .calculator-amount {
            font-size: 2rem;
          }
        }
      `}</style>

      <div className="add-commission-container">
        {/* Header */}
        <div className="page-header">
          <div className="header-top">
            <button className="back-btn" onClick={() => navigate("/admin/commission")}>
              ←
            </button>
            <div>
              <h1 className="page-title">Add Commission</h1>
              <p className="page-subtitle">Create a new commission entry</p>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="info-box">
          <div className="info-box-title">
            <span>💡</span>
            <span>Commission Guidelines</span>
          </div>
          <p className="info-box-text">
            • Commission is calculated automatically based on loan amount
            <br />
            • Commission percentage typically ranges from 0.5% to 4%
            <br />
            • Enter the percentage and see the calculated amount instantly
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="form-card">
          {/* Loan Selection */}
          <div className="form-section">
            <h2 className="section-title">Select Loan File</h2>
            <div className="form-grid">
              <div className="form-group full-width">
                <label className="form-label">
                  Loan File<span className="required">*</span>
                </label>
                <select
                  name="file_id"
                  value={formData.file_id}
                  onChange={handleChange}
                  className={`form-select ${errors.file_id ? "error" : ""}`}
                >
                  <option value="">Select loan file</option>
                  {loanFiles.map((loan) => (
                    <option key={loan.id} value={loan.id}>
                      {loan.id} - {loan.customerName || loan.customer_name || "Unknown"} - {loan.loanType || loan.loan_type || "Unknown"} - {formatCurrency(loan.amount || loan.loanAmount || 0)}
                    </option>
                  ))}
                </select>
                {errors.file_id && (
                  <span className="error-message">⚠️ {errors.file_id}</span>
                )}
                {loanFiles.length === 0 && (
                  <span className="input-hint">
                    No loan files available. Please create loan files first.
                  </span>
                )}
              </div>
            </div>

            {/* Loan Info Display */}
            {selectedLoan && (
              <div className="loan-info-card">
                <div className="loan-info-grid">
                  <div className="loan-info-item">
                    <span className="loan-info-label">Customer Name</span>
                    <span className="loan-info-value">
                      {selectedLoan.customerName || selectedLoan.customer_name || "Unknown"}
                    </span>
                  </div>
                  <div className="loan-info-item">
                    <span className="loan-info-label">Bank Name</span>
                    <span className="loan-info-value">
                      {selectedLoan.bankName || selectedLoan.bank_name || "Unknown"}
                    </span>
                  </div>
                  <div className="loan-info-item">
                    <span className="loan-info-label">Loan Type</span>
                    <span className="loan-info-value">
                      {selectedLoan.loanType || selectedLoan.loan_type || "Unknown"}
                    </span>
                  </div>
                  <div className="loan-info-item">
                    <span className="loan-info-label">Loan Amount</span>
                    <span className="loan-amount">
                      {formatCurrency(selectedLoan.amount || selectedLoan.loanAmount || 0)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Commission Details */}
          <div className="form-section">
            <h2 className="section-title">Commission Details</h2>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">
                  Commission Percentage (%)<span className="required">*</span>
                </label>
                <input
                  type="number"
                  name="commission_percentage"
                  value={formData.commission_percentage}
                  onChange={handleChange}
                  placeholder="e.g., 2.5"
                  step="0.1"
                  min="0"
                  max="10"
                  className={`form-input ${errors.commission_percentage ? "error" : ""}`}
                />
                {errors.commission_percentage && (
                  <span className="error-message">⚠️ {errors.commission_percentage}</span>
                )}
                <span className="input-hint">Enter value between 0 and 10</span>
              </div>

              <div className="form-group">
                <label className="form-label">
                  Payment Status<span className="required">*</span>
                </label>
                <select
                  name="payment_status"
                  value={formData.payment_status}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Paid">Paid</option>
                </select>
              </div>

              {formData.payment_status === "Paid" && (
                <div className="form-group">
                  <label className="form-label">Payment Mode</label>
                  <select
                    name="payment_mode"
                    value={formData.payment_mode}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="">Select payment mode</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="UPI">UPI</option>
                    <option value="Cash">Cash</option>
                    <option value="Cheque">Cheque</option>
                  </select>
                </div>
              )}
            </div>

            {/* Commission Calculator - THIS IS THE IMPORTANT PART */}
            {selectedLoan && formData.commission_percentage && (
              <div className="calculator-card">
                <div className="calculator-title">💰 Calculated Commission Amount</div>
                <div className="calculator-amount">{formatCurrency(calculatedCommission)}</div>
                <div className="calculator-formula">
                  {formatCurrency(selectedLoan.amount || selectedLoan.loanAmount || 0)} × {formData.commission_percentage}% = {formatCurrency(calculatedCommission)}
                </div>
              </div>
            )}
          </div>

          {/* Remarks */}
          <div className="form-section">
            <h2 className="section-title">Additional Information</h2>
            <div className="form-group full-width">
              <label className="form-label">Remarks (Optional)</label>
              <textarea
                name="remarks"
                value={formData.remarks}
                onChange={handleChange}
                placeholder="Add any additional notes or comments..."
                className="form-textarea"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={handleCancel}>
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary" 
              disabled={isSubmitting || !selectedLoan || !formData.commission_percentage}
            >
              {isSubmitting ? "Adding Commission..." : "Add Commission"}
            </button>
          </div>
        </form>
      </div>
      </Layout>
    </>
  );
};

export default AddCommission;