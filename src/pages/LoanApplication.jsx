import { useState } from "react";
import AIAssistant from "../Components/AI_Assistant";

const LoanApplication = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    loanType: "Personal",
    amount: "",
    tenure: "",
    income: "",
    pan: "",
    aadhaar: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.match(/^[\w-.]+@[\w-]+\.[a-z]{2,}$/i)) e.email = "Valid email required";
    if (!form.phone.match(/^\d{10}$/)) e.phone = "10 digit phone required";
    if (!form.amount || isNaN(Number(form.amount)) || Number(form.amount) <= 0) e.amount = "Enter valid amount";
    if (!form.tenure || isNaN(Number(form.tenure)) || Number(form.tenure) <= 0) e.tenure = "Enter valid tenure";
    if (!form.income || isNaN(Number(form.income)) || Number(form.income) <= 0) e.income = "Enter valid income";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const efs = validate();
    setErrors(efs);
    if (Object.keys(efs).length === 0) {
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
      console.log("Form submitted:", form);
    }
  };

  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      phone: "",
      loanType: "Personal",
      amount: "",
      tenure: "",
      income: "",
      pan: "",
      aadhaar: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
    });
    setErrors({});
  };

  const styles = {
    container: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      padding: "3rem 1.5rem",
      position: "relative",
    },
    wrapper: {
      maxWidth: "1200px",
      margin: "0 auto",
    },
    header: {
      textAlign: "center",
      marginBottom: "3rem",
    },
    title: {
      fontSize: "clamp(2rem, 4vw, 3rem)",
      fontWeight: "900",
      color: "white",
      marginBottom: "1rem",
      textShadow: "2px 2px 8px rgba(0,0,0,0.2)",
    },
    subtitle: {
      fontSize: "1.1rem",
      color: "rgba(255,255,255,0.9)",
      maxWidth: "600px",
      margin: "0 auto",
    },
    backButton: {
      position: "fixed",
      top: "1.5rem",
      left: "1.5rem",
      padding: "0.75rem 1.5rem",
      background: "rgba(255,255,255,0.2)",
      backdropFilter: "blur(10px)",
      border: "2px solid rgba(255,255,255,0.3)",
      borderRadius: "10px",
      color: "white",
      fontSize: "0.95rem",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
      display: "inline-flex",
      alignItems: "center",
      gap: "0.5rem",
      textDecoration: "none",
      zIndex: 1000,
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    },
    formCard: {
      background: "white",
      borderRadius: "20px",
      padding: "3rem",
      boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
    },
    successCard: {
      textAlign: "center",
      padding: "3rem",
    },
    successIcon: {
      width: "80px",
      height: "80px",
      background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "40px",
      margin: "0 auto 1.5rem",
    },
    successTitle: {
      fontSize: "2rem",
      fontWeight: "800",
      color: "#1a202c",
      marginBottom: "0.75rem",
    },
    successText: {
      fontSize: "1.125rem",
      color: "#64748b",
      marginBottom: "2rem",
    },
    sectionTitle: {
      fontSize: "1.5rem",
      fontWeight: "700",
      color: "#1a202c",
      marginBottom: "1.5rem",
      paddingBottom: "0.75rem",
      borderBottom: "3px solid #667eea",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    },
    formGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "1.5rem",
      marginBottom: "2rem",
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
    },
    label: {
      fontSize: "0.9rem",
      fontWeight: "600",
      color: "#334155",
    },
    required: {
      color: "#ef4444",
    },
    input: {
      padding: "0.875rem 1rem",
      border: "2px solid #e2e8f0",
      borderRadius: "10px",
      fontSize: "0.95rem",
      transition: "all 0.3s ease",
      outline: "none",
      background: "white",
      color: "#334155",
    },
    inputError: {
      borderColor: "#ef4444",
    },
    select: {
      padding: "0.875rem 1rem",
      border: "2px solid #e2e8f0",
      borderRadius: "10px",
      fontSize: "0.95rem",
      transition: "all 0.3s ease",
      outline: "none",
      background: "white",
      cursor: "pointer",
      color: "#334155",
    },
    textarea: {
      padding: "0.875rem 1rem",
      border: "2px solid #e2e8f0",
      borderRadius: "10px",
      fontSize: "0.95rem",
      transition: "all 0.3s ease",
      outline: "none",
      resize: "vertical",
      minHeight: "100px",
      fontFamily: "inherit",
      background: "white",
      color: "#334155",
    },
    infoBox: {
      background: "linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%)",
      padding: "1.25rem",
      borderRadius: "12px",
      marginBottom: "2rem",
      borderLeft: "4px solid #3b82f6",
      display: "flex",
      gap: "0.75rem",
    },
    infoText: {
      fontSize: "0.9rem",
      color: "#1e40af",
      margin: 0,
      lineHeight: "1.6",
    },
    errorMessage: {
      fontSize: "0.75rem",
      color: "#ef4444",
      display: "flex",
      alignItems: "center",
      gap: "0.25rem",
    },
    buttonGroup: {
      display: "flex",
      gap: "1rem",
      justifyContent: "flex-end",
      marginTop: "2rem",
      paddingTop: "2rem",
      borderTop: "2px solid #f1f5f9",
    },
    button: {
      padding: "1rem 2.5rem",
      borderRadius: "10px",
      fontSize: "1rem",
      fontWeight: "700",
      cursor: "pointer",
      transition: "all 0.3s ease",
      border: "none",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    },
    buttonPrimary: {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white",
      boxShadow: "0 10px 30px rgba(102, 126, 234, 0.3)",
    },
    buttonSecondary: {
      background: "white",
      color: "#64748b",
      border: "2px solid #e2e8f0",
    },
    buttonSuccess: {
      background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
      color: "white",
      boxShadow: "0 10px 30px rgba(16, 185, 129, 0.3)",
    },
    fullWidth: {
      gridColumn: "1 / -1",
    },
    // Mobile responsive styles
    "@media (max-width: 768px)": {
      container: {
        padding: "2rem 1rem",
      },
      formCard: {
        padding: "2rem 1.5rem",
      },
      title: {
        fontSize: "1.75rem",
      },
      subtitle: {
        fontSize: "1rem",
      },
      backButton: {
        top: "1rem",
        left: "1rem",
        padding: "0.6rem 1rem",
        fontSize: "0.85rem",
      },
    },
  };

  // Apply mobile styles dynamically
  if (typeof window !== 'undefined' && window.innerWidth <= 768) {
    styles.container.padding = "2rem 1rem";
    styles.formCard.padding = "2rem 1.5rem";
    styles.backButton.top = "1rem";
    styles.backButton.left = "1rem";
    styles.backButton.padding = "0.6rem 1rem";
    styles.backButton.fontSize = "0.85rem";
    styles.buttonGroup.flexDirection = "column";
    styles.button.width = "100%";
    styles.button.justifyContent = "center";
  }

  const handleBackToHome = () => {
    window.location.href = "/";
  };

  return (
    <div style={styles.container}>
      <button
        style={styles.backButton}
        onClick={handleBackToHome}
        onMouseEnter={(e) => {
          e.target.style.background = "rgba(255,255,255,0.3)";
          e.target.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          e.target.style.background = "rgba(255,255,255,0.2)";
          e.target.style.transform = "translateY(0)";
        }}
      >
        ← Back to Home
      </button>

      <div style={styles.wrapper}>
        <div style={styles.header}>
          <h1 style={styles.title}>💼 Loan Application</h1>
          <p style={styles.subtitle}>
            Fill out the form below and our team will contact you shortly
          </p>
        </div>

        <div style={styles.formCard}>
          {submitted ? (
            <div style={styles.successCard}>
              <div style={styles.successIcon}>✓</div>
              <h2 style={styles.successTitle}>Application Submitted!</h2>
              <p style={styles.successText}>
                Thank you for applying. Our team will review your application and contact you within 24-48 hours.
              </p>
              <button
                style={{...styles.button, ...styles.buttonSuccess}}
                onClick={() => setSubmitted(false)}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-3px)";
                  e.target.style.boxShadow = "0 15px 40px rgba(16, 185, 129, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "0 10px 30px rgba(16, 185, 129, 0.3)";
                }}
              >
                Submit Another Application
              </button>
            </div>
          ) : (
            <div>
              <div style={styles.infoBox}>
                <div style={{fontSize: "1.5rem"}}>ℹ️</div>
                <div style={styles.infoText}>
                  <strong>Required Information:</strong> Please fill out all required fields marked with an asterisk (*). Ensure all information is accurate to avoid delays in processing.
                </div>
              </div>

              {/* Personal Information */}
              <h3 style={styles.sectionTitle}>
                <span>👤</span> Personal Information
              </h3>
              <div style={styles.formGrid}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    Full Name <span style={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    style={{...styles.input, ...(errors.name ? styles.inputError : {})}}
                    placeholder="Enter your full name"
                    onFocus={(e) => {
                      e.target.style.borderColor = "#667eea";
                      e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
                    }}
                    onBlur={(e) => {
                      if (!errors.name) {
                        e.target.style.borderColor = "#e2e8f0";
                        e.target.style.boxShadow = "none";
                      }
                    }}
                  />
                  {errors.name && <div style={styles.errorMessage}>⚠️ {errors.name}</div>}
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    Email Address <span style={styles.required}>*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    style={{...styles.input, ...(errors.email ? styles.inputError : {})}}
                    placeholder="you@example.com"
                    onFocus={(e) => {
                      e.target.style.borderColor = "#667eea";
                      e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
                    }}
                    onBlur={(e) => {
                      if (!errors.email) {
                        e.target.style.borderColor = "#e2e8f0";
                        e.target.style.boxShadow = "none";
                      }
                    }}
                  />
                  {errors.email && <div style={styles.errorMessage}>⚠️ {errors.email}</div>}
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    Phone Number <span style={styles.required}>*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    style={{...styles.input, ...(errors.phone ? styles.inputError : {})}}
                    placeholder="9876543210"
                    maxLength={10}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#667eea";
                      e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
                    }}
                    onBlur={(e) => {
                      if (!errors.phone) {
                        e.target.style.borderColor = "#e2e8f0";
                        e.target.style.boxShadow = "none";
                      }
                    }}
                  />
                  {errors.phone && <div style={styles.errorMessage}>⚠️ {errors.phone}</div>}
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    Monthly Income (₹) <span style={styles.required}>*</span>
                  </label>
                  <input
                    type="number"
                    name="income"
                    value={form.income}
                    onChange={handleChange}
                    style={{...styles.input, ...(errors.income ? styles.inputError : {})}}
                    placeholder="50000"
                    onFocus={(e) => {
                      e.target.style.borderColor = "#667eea";
                      e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
                    }}
                    onBlur={(e) => {
                      if (!errors.income) {
                        e.target.style.borderColor = "#e2e8f0";
                        e.target.style.boxShadow = "none";
                      }
                    }}
                  />
                  {errors.income && <div style={styles.errorMessage}>⚠️ {errors.income}</div>}
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>PAN Number</label>
                  <input
                    type="text"
                    name="pan"
                    value={form.pan}
                    onChange={handleChange}
                    style={styles.input}
                    placeholder="ABCDE1234F"
                    maxLength={10}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#667eea";
                      e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#e2e8f0";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Aadhaar Number</label>
                  <input
                    type="text"
                    name="aadhaar"
                    value={form.aadhaar}
                    onChange={handleChange}
                    style={styles.input}
                    placeholder="1234 5678 9012"
                    maxLength={12}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#667eea";
                      e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#e2e8f0";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>
              </div>

              {/* Loan Details */}
              <h3 style={styles.sectionTitle}>
                <span>💰</span> Loan Details
              </h3>
              <div style={styles.formGrid}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    Loan Type <span style={styles.required}>*</span>
                  </label>
                  <select
                    name="loanType"
                    value={form.loanType}
                    onChange={handleChange}
                    style={styles.select}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#667eea";
                      e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#e2e8f0";
                      e.target.style.boxShadow = "none";
                    }}
                  >
                    <option value="Personal">Personal Loan</option>
                    <option value="Home">Home Loan</option>
                    <option value="Business">Business Loan</option>
                    <option value="Mortgage">Mortgage Loan</option>
                    <option value="Education">Education Loan</option>
                    <option value="Vehicle">Vehicle Loan</option>
                  </select>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    Loan Amount (₹) <span style={styles.required}>*</span>
                  </label>
                  <input
                    type="number"
                    name="amount"
                    value={form.amount}
                    onChange={handleChange}
                    style={{...styles.input, ...(errors.amount ? styles.inputError : {})}}
                    placeholder="500000"
                    onFocus={(e) => {
                      e.target.style.borderColor = "#667eea";
                      e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
                    }}
                    onBlur={(e) => {
                      if (!errors.amount) {
                        e.target.style.borderColor = "#e2e8f0";
                        e.target.style.boxShadow = "none";
                      }
                    }}
                  />
                  {errors.amount && <div style={styles.errorMessage}>⚠️ {errors.amount}</div>}
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    Tenure (Months) <span style={styles.required}>*</span>
                  </label>
                  <input
                    type="number"
                    name="tenure"
                    value={form.tenure}
                    onChange={handleChange}
                    style={{...styles.input, ...(errors.tenure ? styles.inputError : {})}}
                    placeholder="12"
                    onFocus={(e) => {
                      e.target.style.borderColor = "#667eea";
                      e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
                    }}
                    onBlur={(e) => {
                      if (!errors.tenure) {
                        e.target.style.borderColor = "#e2e8f0";
                        e.target.style.boxShadow = "none";
                      }
                    }}
                  />
                  {errors.tenure && <div style={styles.errorMessage}>⚠️ {errors.tenure}</div>}
                </div>
              </div>

              {/* Address Information */}
              <h3 style={styles.sectionTitle}>
                <span>📍</span> Address Information
              </h3>
              <div style={styles.formGrid}>
                <div style={{...styles.formGroup, ...styles.fullWidth}}>
                  <label style={styles.label}>Address</label>
                  <textarea
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    style={styles.textarea}
                    placeholder="Enter your complete address"
                    rows={3}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#667eea";
                      e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#e2e8f0";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>City</label>
                  <input
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    style={styles.input}
                    placeholder="Mumbai"
                    onFocus={(e) => {
                      e.target.style.borderColor = "#667eea";
                      e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#e2e8f0";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>State</label>
                  <input
                    type="text"
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    style={styles.input}
                    placeholder="Maharashtra"
                    onFocus={(e) => {
                      e.target.style.borderColor = "#667eea";
                      e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#e2e8f0";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Pincode</label>
                  <input
                    type="text"
                    name="pincode"
                    value={form.pincode}
                    onChange={handleChange}
                    style={styles.input}
                    placeholder="400001"
                    maxLength={6}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#667eea";
                      e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#e2e8f0";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>
              </div>

              <div style={styles.buttonGroup}>
                <button
                  type="button"
                  style={{...styles.button, ...styles.buttonSecondary}}
                  onClick={resetForm}
                  onMouseEnter={(e) => {
                    e.target.style.background = "#f8fafc";
                    e.target.style.borderColor = "#cbd5e1";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "white";
                    e.target.style.borderColor = "#e2e8f0";
                  }}
                >
                  <span>↺</span> Reset Form
                </button>
                <button
                  type="button"
                  style={{...styles.button, ...styles.buttonPrimary}}
                  onClick={handleSubmit}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "translateY(-3px)";
                    e.target.style.boxShadow = "0 15px 40px rgba(102, 126, 234, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "0 10px 30px rgba(102, 126, 234, 0.3)";
                  }}
                >
                  <span>📝</span> Submit Application
                </button>
              </div>
            </div>
          )}
          <AIAssistant/>
        </div>
      </div>
    </div>
  );
};

export default LoanApplication;