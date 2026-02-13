import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "../../../Components/Layout";

const Documents = () => {
  const navigate = useNavigate();

  /* ---------------- DEFAULT DOCUMENTS DATA ---------------- */
  const defaultDocuments = [
    {
      id: 1,
      doc_id: "DOC001",
      type: "Aadhaar Card",
      name: "Aadhaar_Rajesh_Kumar.pdf",
      date_of_submission: "2024-12-15",
      doc_number: "1234-5678-9012",
      customer_id: "CUST001",
      customer_name: "Rajesh Kumar",
      file_id: "FILE001",
      description: "Identity proof - Aadhaar card front and back",
      remark: "Document verified and approved",
      status: "Approved",
    },
    {
      id: 2,
      doc_id: "DOC002",
      type: "PAN Card",
      name: "PAN_Rajesh_Kumar.pdf",
      date_of_submission: "2024-12-15",
      doc_number: "ABCDE1234F",
      customer_id: "CUST001",
      customer_name: "Rajesh Kumar",
      file_id: "FILE001",
      description: "Tax identity proof - PAN card",
      remark: "Document verified",
      status: "Approved",
    },
    {
      id: 3,
      doc_id: "DOC003",
      type: "Bank Statement",
      name: "Bank_Statement_6_Months.pdf",
      date_of_submission: "2024-12-16",
      doc_number: "STMT-2024-001",
      customer_id: "CUST001",
      customer_name: "Rajesh Kumar",
      file_id: "FILE001",
      description: "Last 6 months bank statement",
      remark: "Pending review by bank executive",
      status: "Pending",
    },
    {
      id: 4,
      doc_id: "DOC004",
      type: "Salary Slip",
      name: "Salary_Slips_3_Months.pdf",
      date_of_submission: "2024-12-16",
      doc_number: "SAL-2024-Q4",
      customer_id: "CUST001",
      customer_name: "Rajesh Kumar",
      file_id: "FILE001",
      description: "Last 3 months salary slips",
      remark: "Documents are not clear, resubmission required",
      status: "Rejected",
    },
    {
      id: 5,
      doc_id: "DOC005",
      type: "Property Documents",
      name: "Property_Papers.pdf",
      date_of_submission: "2024-12-18",
      doc_number: "PROP-2024-001",
      customer_id: "CUST002",
      customer_name: "Priya Sharma",
      file_id: "FILE002",
      description: "Property ownership documents",
      remark: "Under verification",
      status: "Pending",
    },
  ];

  const [documents, setDocuments] = useState([]);
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterType, setFilterType] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    loadDocuments();
    window.addEventListener("focus", loadDocuments);
    return () => window.removeEventListener("focus", loadDocuments);
  }, []);

  useEffect(() => {
    filterDocuments();
  }, [searchTerm, filterStatus, filterType, documents]);

const loadDocuments = () => {
    const storedDocuments = JSON.parse(localStorage.getItem("documents"));
    if (!storedDocuments || storedDocuments.length === 0) {
      localStorage.setItem("documents", JSON.stringify(defaultDocuments));
      setDocuments(defaultDocuments);
      setFilteredDocuments(defaultDocuments);
    } else {
      setDocuments(storedDocuments);
      setFilteredDocuments(storedDocuments);
    }
  };

  const filterDocuments = () => {
    let filtered = [...documents];

    if (searchTerm) {
      filtered = filtered.filter(
        (doc) =>
          doc.doc_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doc.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doc.file_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doc.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doc.doc_number.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus !== "All") {
      filtered = filtered.filter((doc) => doc.status === filterStatus);
    }

    if (filterType !== "All") {
      filtered = filtered.filter((doc) => doc.type === filterType);
    }

    setFilteredDocuments(filtered);
    setCurrentPage(1);
  };

  const handleDelete = (docId) => {
    if (
      window.confirm(
        "⚠️ Are you sure you want to delete this document?\n\nThis action cannot be undone!"
      )
    ) {
      const updatedDocuments = documents.filter((doc) => doc.id !== docId);
      localStorage.setItem("documents", JSON.stringify(updatedDocuments));
      setDocuments(updatedDocuments);
      alert("✅ Document deleted successfully!");
    }
  };

  const getStatusBadgeColor = (status) => {
    const colors = {
      Approved: "status-approved",
      Pending: "status-pending",
      Rejected: "status-rejected",
      "Under Review": "status-review",
    };
    return colors[status] || "status-default";
  };

  const getDocTypeIcon = (type) => {
    const icons = {
      "Aadhaar Card": "🆔",
      "PAN Card": "💳",
      "Bank Statement": "🏦",
      "Salary Slip": "💰",
      "Property Documents": "🏠",
      "Income Proof": "📊",
      "Address Proof": "📍",
      "ITR": "📝",
      "Form 16": "📋",
      "Business Documents": "💼",
      "Passport": "🛂",
      "Driving License": "🚗",
      "Voter ID": "🗳",
      "Other": "📄",
    };
    return icons[type] || "📄";
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDocuments.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage);

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

        .documents-page {
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

        /* Header Section */
        .page-header-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          padding: 2rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 16px;
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

        .header-text {
          color: white;
        }

        .page-title {
          font-size: 2rem;
          font-weight: 700;
          margin: 0 0 0.5rem 0;
          color: white;
          letter-spacing: -0.02em;
        }

        .page-description {
          font-size: 1rem;
          margin: 0;
          color: rgba(255, 255, 255, 0.9);
        }

        .btn-upload-document {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.875rem 1.75rem;
          background: white;
          color: #667eea;
          border: none;
          border-radius: 10px;
          font-size: 0.9375rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .btn-upload-document:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
        }

        .btn-icon {
          font-size: 20px;
          font-weight: 700;
        }

        /* Stats Dashboard */
        .stats-dashboard {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.25rem;
          margin-bottom: 2rem;
        }

        .stat-card {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
          transition: all 0.3s ease;
          border-left: 4px solid transparent;
          border: 1px solid #e2e8f0;
        }

        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        }

        .stat-total {
          border-left-color: #667eea;
        }

        .stat-approved {
          border-left-color: #10b981;
        }

        .stat-pending {
          border-left-color: #f59e0b;
        }

        .stat-rejected {
          border-left-color: #ef4444;
        }

        .stat-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .stat-icon {
          font-size: 2rem;
        }

        .stat-trend {
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.25rem 0.5rem;
          border-radius: 6px;
          background: #f1f5f9;
          color: #64748b;
        }

        .stat-trend.success {
          background: #d1fae5;
          color: #065f46;
        }

        .stat-trend.warning {
          background: #fef3c7;
          color: #92400e;
        }

        .stat-trend.danger {
          background: #fee2e2;
          color: #991b1b;
        }

        .stat-body {
          margin-top: 0.5rem;
        }

        .stat-value {
          font-size: 2.25rem;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 0.25rem 0;
          line-height: 1;
          font-family: 'JetBrains Mono', monospace;
        }

        .stat-label {
          font-size: 0.875rem;
          color: #64748b;
          font-weight: 500;
        }

        /* Filters Section */
        .filters-section {
          background: white;
          border-radius: 12px;
          padding: 1.25rem;
          margin-bottom: 1.5rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
          border: 1px solid #e2e8f0;
        }

        .filter-group {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
          margin-bottom: 1rem;
        }

        .search-input-wrapper {
          position: relative;
          flex: 1;
          min-width: 300px;
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          width: 20px;
          height: 20px;
          color: #94a3b8;
          stroke-width: 2;
        }

        .search-input {
          width: 100%;
          padding: 0.75rem 2.75rem 0.75rem 3rem;
          border: 2px solid #e2e8f0;
          border-radius: 10px;
          font-size: 0.875rem;
          transition: all 0.3s ease;
          background: #f8fafc;
          color: #475569;
        }

        .search-input:focus {
          outline: none;
          border-color: #667eea;
          background: white;
          box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
        }

        .clear-search {
          position: absolute;
          right: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          width: 24px;
          height: 24px;
          border: none;
          background: #e2e8f0;
          color: #64748b;
          border-radius: 50%;
          cursor: pointer;
          font-size: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .clear-search:hover {
          background: #ef4444;
          color: white;
        }

        .filter-dropdown {
          padding: 0.75rem 1rem;
          border: 2px solid #e2e8f0;
          border-radius: 10px;
          font-size: 0.875rem;
          background: #f8fafc;
          cursor: pointer;
          transition: all 0.3s ease;
          min-width: 180px;
          font-weight: 500;
          color: #475569;
        }

        .filter-dropdown:focus {
          outline: none;
          border-color: #667eea;
          background: white;
          box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
        }

        .btn-reset {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          background: #f8fafc;
          border: 2px solid #e2e8f0;
          border-radius: 10px;
          font-size: 0.875rem;
          font-weight: 600;
          color: #475569;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-reset:hover {
          background: #e2e8f0;
          border-color: #cbd5e1;
        }

        .btn-reset svg {
          width: 16px;
          height: 16px;
          stroke-width: 2;
        }

        .results-info {
          padding-top: 1rem;
          border-top: 1px solid #e2e8f0;
        }

        .results-text {
          font-size: 0.875rem;
          color: #64748b;
        }

        .results-text strong {
          color: #0f172a;
          font-weight: 600;
        }

        /* Table Container */
        .table-container {
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
          overflow: hidden;
          border: 1px solid #e2e8f0;
        }

        .documents-table {
          width: 100%;
          border-collapse: collapse;
        }

        .documents-table thead {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .documents-table thead th {
          padding: 1rem 1.25rem;
          text-align: left;
          font-size: 0.8125rem;
          font-weight: 600;
          color: white;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .documents-table tbody tr {
          border-bottom: 1px solid #f1f3f5;
          transition: all 0.2s ease;
        }

        .documents-table tbody tr:hover {
          background: #f8fafc;
        }

        .documents-table tbody tr:last-child {
          border-bottom: none;
        }

        .documents-table tbody td {
          padding: 1.25rem;
          font-size: 0.875rem;
          color: #475569;
        }

        .checkbox-header,
        .checkbox-row {
          width: 18px;
          height: 18px;
          cursor: pointer;
          accent-color: #667eea;
        }

        /* Document Info */
        .doc-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .doc-icon-wrapper {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          flex-shrink: 0;
        }

        .doc-details {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .doc-id {
          font-weight: 600;
          color: #0f172a;
          font-size: 0.875rem;
        }

        .doc-type {
          font-size: 0.75rem;
          color: #64748b;
        }

        /* Customer Info */
        .customer-info {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .customer-name {
          font-weight: 600;
          color: #0f172a;
          font-size: 0.875rem;
        }

        .customer-id {
          font-size: 0.75rem;
          color: #64748b;
        }

        /* File Badge */
        .file-badge {
          display: inline-block;
          padding: 0.375rem 0.75rem;
          background: #dbeafe;
          color: #1e40af;
          border-radius: 6px;
          font-weight: 600;
          font-size: 0.8125rem;
          font-family: 'JetBrains Mono', monospace;
        }

        /* Document Number */
        .doc-number {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.8125rem;
          background: #f1f5f9;
          padding: 0.375rem 0.625rem;
          border-radius: 6px;
          color: #475569;
          font-weight: 500;
        }

        /* Date */
        .date {
          color: #64748b;
          font-size: 0.875rem;
        }

        /* Status Badge */
        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          padding: 0.375rem 0.75rem;
          border-radius: 20px;
          font-size: 0.8125rem;
          font-weight: 600;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        .status-approved {
          background: #d1fae5;
          color: #065f46;
        }

        .status-approved .status-dot {
          background: #10b981;
        }

        .status-pending {
          background: #fef3c7;
          color: #92400e;
        }

        .status-pending .status-dot {
          background: #f59e0b;
        }

        .status-rejected {
          background: #fee2e2;
          color: #991b1b;
        }

        .status-rejected .status-dot {
          background: #ef4444;
        }

        .status-review {
          background: #dbeafe;
          color: #1e40af;
        }

        .status-review .status-dot {
          background: #3b82f6;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        /* Action Buttons */
        .action-buttons {
          display: flex;
          gap: 0.5rem;
        }

        .action-btn {
          width: 36px;
          height: 36px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .action-btn svg {
          width: 18px;
          height: 18px;
          stroke-width: 2;
          
        }

        .action-view {
          background: #dbeafe;
          color: #1e40af;
        }

        .action-view:hover {
          background: #3b82f6;
          color: white;
          transform: translateY(-2px);
        }

        .action-edit {
          background: #fef3c7;
          color: #92400e;
        }

        .action-edit:hover {
          background: #f59e0b;
          color: white;
          transform: translateY(-2px);
        }

        .action-delete {
          background: #fee2e2;
          color: #991b1b;
        }

        .action-delete:hover {
          background: #ef4444;
          color: white;
          transform: translateY(-2px);
        }


        /* No Data */
        .no-data {
          padding: 4rem 1.25rem;
          text-align: center;
        }

        .no-data-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .no-data-icon {
          font-size: 4rem;
          opacity: 0.5;
        }

        .no-data-content h3 {
          font-size: 1.25rem;
          color: #0f172a;
          margin: 0;
          font-weight: 600;
        }

        .no-data-content p {
          font-size: 0.875rem;
          color: #64748b;
          margin: 0;
        }

        /* Pagination */
        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.75rem;
          margin-top: 1.5rem;
          padding: 1.25rem;
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
          border: 1px solid #e2e8f0;
        }

        .pagination-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.625rem 1rem;
          background: #f8fafc;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          font-size: 0.875rem;
          font-weight: 600;
          color: #475569;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .pagination-btn:hover:not(:disabled) {
          background: #667eea;
          border-color: #667eea;
          color: white;
        }

        .pagination-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .pagination-btn svg {
          width: 16px;
          height: 16px;
          stroke-width: 2;
        }

        .pagination-pages {
          display: flex;
          gap: 0.5rem;
        }

        .pagination-page {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #e2e8f0;
          background: #f8fafc;
          border-radius: 8px;
          font-size: 0.875rem;
          font-weight: 600;
          color: #475569;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .pagination-page:hover {
          border-color: #667eea;
          color: #667eea;
        }

        .pagination-page.active {
          background: #667eea;
          border-color: #667eea;
          color: white;
        }

        /* Responsive */
        @media (max-width: 1200px) {
          .stats-dashboard {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 968px) {
          .documents-page {
            padding: 1rem;
          }

          .page-header-section {
            flex-direction: column;
            align-items: stretch;
            gap: 1.5rem;
            padding: 1.5rem;
          }


        .header-content {
            flex-direction: column;
            text-align: center;
          }

          .btn-upload-document {
            width: 100%;
            justify-content: center;
          }

          .stats-dashboard {
            grid-template-columns: 1fr;
          }

          .filter-group {
            flex-direction: column;
          }

          .search-input-wrapper {
            min-width: 100%;
          }

          .filter-dropdown,
          .btn-reset {
            width: 100%;
          }

          .table-container {
            overflow-x: auto;
          }

          .documents-table {
            min-width: 800px;
          }

          .pagination {
            flex-wrap: wrap;
          }

          .pagination-pages {
            order: 3;
            width: 100%;
            justify-content: center;
            margin-top: 0.5rem;
          }
        }

        @media (max-width: 640px) {
          .page-title {
            font-size: 1.5rem;
          }

          .page-description {
            font-size: 0.875rem;
          }

          .header-icon {
            width: 48px;
            height: 48px;
            font-size: 24px;
          }
        }
      `}</style>

      <div className="documents-page">
        {/* Breadcrumb */}
        <div className="breadcrumb-nav">
          <span onClick={() => navigate("/admin")} className="breadcrumb-link">
            Dashboard
          </span>
          <span className="breadcrumb-separator">›</span>
          <span className="breadcrumb-current">Documents</span>
        </div>

        {/* Header Section */}
        <div className="page-header-section">
          <div className="header-content">
            <div className="header-icon">📄</div>
            <div className="header-text">
              <h1 className="page-title">Document Management</h1>
              <p className="page-description">
                Manage and verify customer documents for loan applications
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate("/admin/upload-document")}
            className="btn-upload-document"
          >
            <span className="btn-icon">+</span>
            Upload Document
          </button>
        </div>

        {/* Stats Dashboard */}
        <div className="stats-dashboard">
          <div className="stat-card stat-total">
            <div className="stat-header">
              <span className="stat-icon">📊</span>
              <span className="stat-trend">+12%</span>
            </div>
            <div className="stat-body">
              <h3 className="stat-value">{documents.length}</h3>
              <p className="stat-label">Total Documents</p>
            </div>
          </div>

          <div className="stat-card stat-approved">
            <div className="stat-header">
              <span className="stat-icon">✅</span>
              <span className="stat-trend success">+8%</span>
            </div>
            <div className="stat-body">
              <h3 className="stat-value">
                {documents.filter((d) => d.status === "Approved").length}
              </h3>
              <p className="stat-label">Approved</p>
            </div>
          </div>

          <div className="stat-card stat-pending">
            <div className="stat-header">
              <span className="stat-icon">⏳</span>
              <span className="stat-trend warning">-5%</span>
            </div>
            <div className="stat-body">
              <h3 className="stat-value">
                {documents.filter((d) => d.status === "Pending").length}
              </h3>
              <p className="stat-label">Pending Review</p>
            </div>
          </div>

        <div className="stat-card stat-rejected">
            <div className="stat-header">
              <span className="stat-icon">❌</span>
              <span className="stat-trend danger">-3%</span>
            </div>
            <div className="stat-body">
              <h3 className="stat-value">
                {documents.filter((d) => d.status === "Rejected").length}
              </h3>
              <p className="stat-label">Rejected</p>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="filters-section">
          <div className="filter-group">
            <div className="search-input-wrapper">
              <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                type="text"
                className="search-input"
                placeholder="Search by Doc ID, Customer, File ID, Type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  className="clear-search"
                  onClick={() => setSearchTerm("")}
                >
                  ×
                </button>
              )}
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="filter-dropdown"
            >
              <option value="All">All Status</option>
              <option value="Approved">✅ Approved</option>
              <option value="Pending">⏳ Pending</option>
              <option value="Rejected">❌ Rejected</option>
              <option value="Under Review">🔍 Under Review</option>
            </select>

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="filter-dropdown"
            >
              <option value="All">All Types</option>
              <option value="Aadhaar Card">🆔 Aadhaar Card</option>
              <option value="PAN Card">💳 PAN Card</option>
              <option value="Bank Statement">🏦 Bank Statement</option>
              <option value="Salary Slip">💰 Salary Slip</option>
              <option value="Property Documents">🏠 Property Documents</option>
            </select>

            <button
              onClick={() => {
                setSearchTerm("");
                setFilterStatus("All");
                setFilterType("All");
              }}
              className="btn-reset"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
                <path d="M21 3v5h-5"/>
                <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
                <path d="M3 21v-5h5"/>
              </svg>
              Reset
            </button>
          </div>

          <div className="results-info">
            <span className="results-text">
              Showing <strong>{currentItems.length}</strong> of{" "}
              <strong>{filteredDocuments.length}</strong> documents
            </span>
          </div>
        </div>

        {/* Documents Table */}
        <div className="table-container">
          <table className="documents-table">
            <thead>
              <tr>
                <th>
                  <input type="checkbox" className="checkbox-header" />
                </th>
                <th>Document Info</th>
                <th>Customer Details</th>
                <th>File ID</th>
                <th>Document Number</th>
                <th>Submission Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan="8" className="no-data">
                    <div className="no-data-content">
                      <div className="no-data-icon">📭</div>
                      <h3>No documents found</h3>
                      <p>Try adjusting your filters or search terms</p>
                    </div>
                  </td>
                </tr>
              ) : (
                currentItems.map((doc) => (
                  <tr key={doc.id} className="table-row">
                    <td>
                      <input type="checkbox" className="checkbox-row" />
                    </td>
                    <td>
                      <div className="doc-info">
                        <div className="doc-icon-wrapper">
                          <span className="doc-type-icon">
                            {getDocTypeIcon(doc.type)}
                          </span>
                        </div>
                        <div className="doc-details">
                          <span className="doc-id">{doc.doc_id}</span>
                          <span className="doc-type">{doc.type}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="customer-info">
                        <span className="customer-name">{doc.customer_name}</span>
                        <span className="customer-id">{doc.customer_id}</span>
                      </div>
                    </td>
                    <td>
                      <span className="file-badge">{doc.file_id}</span>
                    </td>
                    <td>
                      <code className="doc-number">{doc.doc_number}</code>
                    </td>
                    <td>
                      <span className="date">
                        {new Date(doc.date_of_submission).toLocaleDateString(
                          "en-IN",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </span>
                    </td>
                    <td>
                      <span className={`status-badge ${getStatusBadgeColor(doc.status)}`}>
                        <span className="status-dot"></span>
                        {doc.status}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          onClick={() =>
                            navigate(`/admin/document-details/${doc.id}`)
                          }
                          className="action-btn action-view"
                          title="View Details"
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                            <circle cx="12" cy="12" r="3"/>
                          </svg>
                        </button>
                        <button
                          onClick={() => navigate(`/admin/edit-document/${doc.id}`)}
                          className="action-btn action-edit"
                          title="Edit Document"
                        >

                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(doc.id)}
                          className="action-btn action-delete"
                          title="Delete Document"
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <polyline points="3 6 5 6 21 6"/>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="pagination-btn"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
              Previous
            </button>

            <div className="pagination-pages">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`pagination-page ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="pagination-btn"
            >
              Next
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
          </div>
        )}
      </div>
      </Layout>
    </>
  );
};

export default Documents;