import Sidebar from "./Sidebar";
import "../Styles/layout.css";
import { useState, useEffect } from "react";

const Layout = ({ children }) => {
  // OPEN BY DEFAULT on wide screens; collapse on small screens after mount
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth <= 1024) {
      setOpen(false);
    }
  }, []);

  return (
    <>
      {/* MOBILE HEADER */}
      <header className="mobile-header">
        <button
          className="sidebar-toggle"
          onClick={() => setOpen((s) => !s)}
          aria-expanded={open}
          aria-controls="app-sidebar"
        >
          ☰
        </button>
        <span className="mobile-title">DSA CRM</span>
      </header>

      {/* Overlay for mobile when sidebar open */}
      {open && (
        <div
          className="sidebar-overlay"
          onClick={() => setOpen(false)}
          role="button"
          tabIndex={0}
          aria-label="Close sidebar"
        />
      )}

      <div className="layout">
        <Sidebar open={open} setOpen={setOpen} />
        <div className="content">
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
