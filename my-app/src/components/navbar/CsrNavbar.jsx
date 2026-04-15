import { NavLink } from "react-router-dom";

export default function CsrNavbar() {
  const linkClass = ({ isActive }) =>
    `nav-link d-flex align-items-center rounded px-3 py-2 ${
      isActive ? "active fw-bold bg-primary text-white" : "text-dark"
    }`;

  return (
    <>
      {/* MOBILE TOP BAR */}
      <div className="d-flex d-md-none justify-content-between align-items-center bg-white border-bottom shadow-sm px-3 py-2 sticky-top">
        <h6 className="mb-0 fw-bold"> CSR Portal </h6>

        <nav className="nav gap-2">
          <NavLink to="/" className={linkClass}>
            📊 <span className="ms-1">Dashboard</span>
          </NavLink>

          <NavLink to="/create" className={linkClass}>
            👤 <span className="ms-1">Create</span>
          </NavLink>
        </nav>
      </div>

      {/* DESKTOP SIDEBAR */}
      <div className="d-none d-md-flex flex-column bg-white border-end shadow-sm p-3 vh-100 position-sticky top-0" style={{ width: "240px" }}>
        <h5 className="fw-bold mb-4 px-2">CSR Portal</h5>

        <nav className="nav flex-column gap-1">
          <small className="text-uppercase text-muted fw-bold mb-2 px-2">
            Main Menu
          </small>

          <NavLink to="/" className={linkClass}>
            📊 <span className="ms-2">Dashboard</span>
          </NavLink>

          <NavLink to="/create" className={linkClass}>
            👤 <span className="ms-2">Create Mock</span>
          </NavLink>
        </nav>
      </div>
    </>
  );
}