import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../../Components/Layout";

const UploadDocument = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    type: "",
    docNumber: "",
    customerId: "",
    customerName: "",
    fileId: "",
    description: "",
    remark: "",
    status: "Pending",
  });

  const [errors, setErrors] = useState({});

  const documentTypes = [
    "Aadhaar Card",
    "PAN Card",
    "Bank Statement",
    "Salary Slip",
    "Property Documents",
    "Income Proof",
    "Address Proof",
    "ITR",
    "Form 16",
    "Business Documents",
    "Passport",
    "Driving License",
    "Voter ID",
    "Other",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.type) newErrors.type = "Document type is required";
    if (!formData.docNumber) newErrors.docNumber = "Document number is required";
    if (!formData.customerId) newErrors.customerId = "Customer ID is required";
    if (!formData.customerName) newErrors.customerName = "Customer name is required";
    if (!formData.fileId) newErrors.fileId = "File ID is required";
    if (!formData.description) newErrors.description = "Description is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      alert("❌ Please fill all required fields correctly!");
      return;
    }

    const documents = JSON.parse(localStorage.getItem("documents")) || [];
    const newDocument = {
      id: Date.now(),
      doc_id: `DOC${String(documents.length + 1).padStart(3, "0")}`,
      type: formData.type,
      name: `${formData.type.replace(/ /g, "_")}_${formData.customerName.replace(/ /g, "_")}.pdf`,
      date_of_submission: new Date().toISOString().split("T")[0],
      doc_number: formData.docNumber,
      customer_id: formData.customerId,
      customer_name: formData.customerName,
      file_id: formData.fileId,
      description: formData.description,
      remark: formData.remark || "Document uploaded successfully",
      status: formData.status,
    };

    documents.push(newDocument);
    localStorage.setItem("documents", JSON.stringify(documents));

    alert("✅ Document uploaded successfully!");
    navigate("/admin/documents");
  };

  const handleCancel = () => {
    if (
      Object.values(formData).some((val) => val !== "" && val !== "Pending") &&
      !window.confirm("⚠️ You have unsaved changes. Do you want to leave?")
    ) {
      return;
    }
    navigate("/admin/documents");
  };

  return (
    <>
    <Layout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');

        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .upload-document-page {
          min-height: 100vh;
          background: #f8fafc;
          padding: 1.5rem;
        }

        /* Breadcrumb */
        .breadcrumb-nav {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
          font-size: 0.875rem;
        }

        .breadcrumb-link {
          color: #64748b;
          cursor: pointer;
          transition: color 0.2s;
        }

        .breadcrumb-link:hover {
          color: #0f172a;
        }

        .breadcrumb-separator {
          color: #cbd5e1;
        }

        .breadcrumb-current {
          color: #0f172a;
          font-weight: 600;
        }

        /* Header */
        .page-header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 16px;
          padding: 2rem;
          margin-bottom: 2rem;
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.2);
        }

        .header-content {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }

        .header-icon {
          width: 64px;
          height: 64px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          backdrop-filter: blur(10px);
        }

        .header-text h1 {
          font-size: 2rem;
          font-weight: 700;
          margin: 0 0 0.5rem 0;
          color: white;
          letter-spacing: -0.02em;
        }

        .header-text p {
          font-size: 1rem;
          margin: 0;
          color: rgba(255, 255, 255, 0.9);
        }

        /* Info Box */
        .info-box {
          background: #dbeafe;
          border-left: 4px solid #3b82f6;
          border-radius: 8px;
          padding: 1rem 1.25rem;
          margin-bottom: 2rem;
        }

        .info-box-content {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
        }

        .info-icon {
          font-size: 1.5rem;
          flex-shrink: 0;
        }

        .info-text h3 {
          font-size: 0.875rem;
          font-weight: 600;
          color: #1e40af;
          margin: 0 0 0.25rem 0;
        }

        .info-text p {
          font-size: 0.8125rem;
          color: #1e3a8a;
          margin: 0;
          line-height: 1.5;
        }

        /* Form Container */
        .form-container {
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
          border: 1px solid #e2e8f0;
          overflow: hidden;
        }

        /* Form Sections */
        .form-section {
          padding: 2rem;
          border-bottom: 1px solid #e2e8f0;
        }

        .form-section:last-child {
          border-bottom: none;
        }

        .section-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid #f1f5f9;
        }

        .section-icon {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          color: white;
        }

        .section-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: #0f172a;
          margin: 0;
        }

        /* Form Grid */
        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }

        .form-grid.single {
          grid-template-columns: 1fr;
        }

        /* Form Group */
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
          color: #475569;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .required {
          color: #ef4444;
        }

        .form-input,
        .form-select,
        .form-textarea {
          padding: 0.75rem 1rem;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          font-size: 0.875rem;
          transition: all 0.3s ease;
          background: #f8fafc;
          color: #0f172a;
          font-weight: 500;
        }

        .form-input:focus,
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
          font-family: inherit;
        }

        .form-hint {
          font-size: 0.75rem;
          color: #64748b;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .error-message {
          font-size: 0.75rem;
          color: #ef4444;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .form-input.error,
        .form-select.error,
        .form-textarea.error {
          border-color: #ef4444;
          background: #fef2f2;
        }

        /* Form Actions */
        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          padding: 1.5rem 2rem;
          background: #f8fafc;
        }

        .btn {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 8px;
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .btn-cancel {
          background: white;
          color: #64748b;
          border: 2px solid #e2e8f0;
        }

        .btn-cancel:hover {
          background: #f8fafc;
          border-color: #cbd5e1;
        }

        .btn-submit {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        }

        .btn-submit:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
        }

        /* Responsive */
        @media (max-width: 968px) {
          .upload-document-page {
            padding: 1rem;
          }

          .page-header {
            padding: 1.5rem;
          }

          .header-content {
            flex-direction: column;
            text-align: center;
          }

          .header-text h1 {
            font-size: 1.5rem;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }

          .form-section {
            padding: 1.5rem;
          }

          .form-actions {
            flex-direction: column;
            padding: 1.25rem;
          }

          .btn {
            width: 100%;
            justify-content: center;
          }
        }

        @media (max-width: 640px) {
          .header-icon {
            width: 48px;
            height: 48px;
            font-size: 24px;
          }

          .header-text h1 {
            font-size: 1.25rem;
          }

          .header-text p {
            font-size: 0.875rem;
          }
        }
      `}</style>

      <div className="upload-document-page">
        {/* Breadcrumb */}
        <div className="breadcrumb-nav">
          <span onClick={() => navigate("/admin")} className="breadcrumb-link">
            Dashboard
          </span>
          <span className="breadcrumb-separator">›</span>
          <span onClick={() => navigate("/admin/documents")} className="breadcrumb-link">
            Documents
          </span>
          <span className="breadcrumb-separator">›</span>
          <span className="breadcrumb-current">Upload Document</span>
        </div>

        {/* Header */}
        <div className="page-header">
          <div className="header-content">
            <div className="header-icon">📤</div>
            <div className="header-text">
              <h1>Upload Document</h1>
              <p>Upload and submit customer documents for verification</p>
            </div>
          </div>
        </div>


    {/* Info Box */}
        <div className="info-box">
          <div className="info-box-content">
            <span className="info-icon">💡</span>
            <div className="info-text">
              <h3>Important Information</h3>
              <p>
                Please ensure all document details are accurate. Document number format varies by type (e.g., Aadhaar: 1234-5678-9012, PAN: ABCDE1234F). All fields marked with * are mandatory.
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="form-container">
            {/* Section 1: Document Information */}
            <div className="form-section">
              <div className="section-header">
                <div className="section-icon">📄</div>
                <h2 className="section-title">Document Information</h2>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">
                    Document Type <span className="required">*</span>
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className={`form-select ${errors.type ? "error" : ""}`}
                  >
                    <option value="">Select Document Type</option>
                    {documentTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.type && (
                    <span className="error-message">⚠️ {errors.type}</span>
                  )}
                  <span className="form-hint">
                    💡 Select the type of document you're uploading
                  </span>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Document Number <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="docNumber"
                    value={formData.docNumber}
                    onChange={handleChange}
                    placeholder="e.g., 1234-5678-9012"
                    className={`form-input ${errors.docNumber ? "error" : ""}`}
                  />
                  {errors.docNumber && (
                    <span className="error-message">⚠️ {errors.docNumber}</span>
                  )}
                  <span className="form-hint">
                    💡 Official document number (Aadhaar, PAN, etc.)
                  </span>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Status <span className="required">*</span>
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="Pending">⏳ Pending</option>
                    <option value="Under Review">🔍 Under Review</option>
                    <option value="Approved">✅ Approved</option>
                    <option value="Rejected">❌ Rejected</option>
                  </select>
                  <span className="form-hint">
                    💡 Current verification status
                  </span>
                </div>
              </div>
            </div>

            {/* Section 2: Customer & File Details */}
            <div className="form-section">
              <div className="section-header">
                <div className="section-icon">👤</div>
                <h2 className="section-title">Customer & File Details</h2>
              </div>

            <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">
                    Customer ID <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="customerId"
                    value={formData.customerId}
                    onChange={handleChange}
                    placeholder="e.g., CUST001"
                    className={`form-input ${errors.customerId ? "error" : ""}`}
                  />
                  {errors.customerId && (
                    <span className="error-message">⚠️ {errors.customerId}</span>
                  )}
                  <span className="form-hint">
                    💡 Unique customer identifier
                  </span>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Customer Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleChange}
                    placeholder="e.g., Rajesh Kumar"
                    className={`form-input ${errors.customerName ? "error" : ""}`}
                  />
                  {errors.customerName && (
                    <span className="error-message">⚠️ {errors.customerName}</span>
                  )}
                  <span className="form-hint">
                    💡 Full name as per documents
                  </span>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    File ID <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="fileId"
                    value={formData.fileId}
                    onChange={handleChange}
                    placeholder="e.g., FILE001"
                    className={`form-input ${errors.fileId ? "error" : ""}`}
                  />
                  {errors.fileId && (
                    <span className="error-message">⚠️ {errors.fileId}</span>
                  )}
                  <span className="form-hint">
                    💡 Associated loan file ID
                  </span>
                </div>
              </div>
            </div>

            {/* Section 3: Additional Details */}
            <div className="form-section">
              <div className="section-header">
                <div className="section-icon">📝</div>
                <h2 className="section-title">Additional Details</h2>
              </div>

              <div className="form-grid single">
                <div className="form-group">
                  <label className="form-label">
                    Description <span className="required">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter document description (e.g., Identity proof - Aadhaar card front and back)"
                    className={`form-textarea ${errors.description ? "error" : ""}`}
                  />
                  {errors.description && (
                    <span className="error-message">⚠️ {errors.description}</span>
                  )}
                  <span className="form-hint">
                    💡 Provide details about the document
                  </span>
                </div>


            <div className="form-group">
                  <label className="form-label">
                    Remark (Optional)
                  </label>
                  <textarea
                    name="remark"
                    value={formData.remark}
                    onChange={handleChange}
                    placeholder="Enter any additional remarks or notes"
                    className="form-textarea"
                  />
                  <span className="form-hint">
                    💡 Any additional notes or observations
                  </span>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="form-actions">
              <button type="button" onClick={handleCancel} className="btn btn-cancel">
                <span>❌</span>
                <span>Cancel</span>
              </button>
              <button type="submit" className="btn btn-submit">
                <span>✅</span>
                <span>Upload Document</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
    </>
  );
};

export default UploadDocument;