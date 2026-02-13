import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/Login.css";

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = (formData) => {
    const newErrors = {};

    if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    if (formData.password.length < 3) {
      newErrors.password = "Password must be at least 3 characters";
    }

    if (isSignup) {
      if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Valid email is required";
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }

      if (!formData.fullName || formData.fullName.length < 2) {
        newErrors.fullName = "Full name is required";
      }
    }

    if (!formData.role) {
      newErrors.role = "Please select a role";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      username: e.target.username.value.trim(),
      password: e.target.password.value,
      role: e.target.role.value,
      ...(isSignup && {
        email: e.target.email.value.trim(),
        fullName: e.target.fullName.value.trim(),
        confirmPassword: e.target.confirmPassword.value,
      }),
    };

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    /* ================= USER OBJECT ================= */
    const loggedInUser = {
      username: formData.username,
      name: formData.fullName || formData.username,
      email: formData.email || "",
      role: formData.role,
      loginTime: new Date().toISOString(),
    };

    /* ================= SIGNUP (DEMO) ================= */
    if (isSignup) {
      const users = JSON.parse(localStorage.getItem("users") || "[]");

      users.push({
        ...loggedInUser,
        password: formData.password, // demo only
        createdAt: new Date().toISOString(),
      });

      localStorage.setItem("users", JSON.stringify(users));
    }

    /* ================= AUTH STORAGE ================= */
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    localStorage.setItem("username", loggedInUser.username);
    localStorage.setItem("role", loggedInUser.role);
    localStorage.setItem("isLoggedIn", "true");

    /* ================= ROLE BASED REDIRECT ================= */
    if (formData.role === "admin") {
      navigate("/admin/dashboard");
    }
    else if (formData.role === "operator") {
      navigate("/operator/dashboard"); 
    }
    else if (formData.role === "marketing") {
      navigate("/marketing/dashboard"); 
    }
    else if (formData.role === "bank") {
      navigate("/bank-executive");
    }
  };

  return (
    <>
      <Link to="/" className="back-to-home">
        ← Back to Home
      </Link>

      <div className="login-container">
        <form className="login-box" onSubmit={handleSubmit}>
          <h2>{isSignup ? "Create Account" : "CRM Login"}</h2>

          <p className="form-subtitle">
            {isSignup
              ? "Join our platform to get started"
              : "Welcome back! Please login to continue"}
          </p>

          {isSignup && (
            <>
              <div className="input-group">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  required
                  className={errors.fullName ? "error" : ""}
                />
                {errors.fullName && (
                  <span className="error-text">{errors.fullName}</span>
                )}
              </div>

              <div className="input-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  required
                  className={errors.email ? "error" : ""}
                />
                {errors.email && (
                  <span className="error-text">{errors.email}</span>
                )}
              </div>
            </>
          )}

          <div className="input-group">
            <input
              type="text"
              name="username"
              placeholder="Username"
              required
              className={errors.username ? "error" : ""}
            />
            {errors.username && (
              <span className="error-text">{errors.username}</span>
            )}
          </div>

          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              className={errors.password ? "error" : ""}
            />
            {errors.password && (
              <span className="error-text">{errors.password}</span>
            )}
          </div>

          {isSignup && (
            <div className="input-group">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                required
                className={errors.confirmPassword ? "error" : ""}
              />
              {errors.confirmPassword && (
                <span className="error-text">{errors.confirmPassword}</span>
              )}
            </div>
          )}

          <div className="input-group">
            <select name="role" required className={errors.role ? "error" : ""}>
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="operator">Data Operator</option>
              <option value="marketing">Marketing Executive</option>
              <option value="bank">Bank Executive</option>
            </select>
            {errors.role && (
              <span className="error-text">{errors.role}</span>
            )}
          </div>

          <button type="submit">
            {isSignup ? "Create Account" : "Login"}
          </button>

          <div className="form-toggle">
            {isSignup ? (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  className="toggle-btn"
                  onClick={() => {
                    setIsSignup(false);
                    setErrors({});
                  }}
                >
                  Login here
                </button>
              </>
            ) : (
              <>
                Don't have an account?{" "}
                <button
                  type="button"
                  className="toggle-btn"
                  onClick={() => {
                    setIsSignup(true);
                    setErrors({});
                  }}
                >
                  Sign up
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
