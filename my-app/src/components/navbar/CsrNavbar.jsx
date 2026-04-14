import { NavLink } from "react-router-dom";

export default function CsrNavbar() {
  return (
    <div className="bg-white border-end d-flex flex-column p-4 shadow-sm">
      <div className="d-flex align-items-center mb-5 ps-2">
        <h5 className="mb-0 text-dark fw-bold">CSR Panel</h5>
      </div>

      <nav className="nav nav-pills flex-column flex-grow-1">
        <small className="text-uppercase text-muted fw-bold mb-3 ps-2">
          Main Menu
        </small>

        <NavLink to="/" className="nav-link mb-2 py-2 px-3">
          📊 Dashboard
        </NavLink>

        <NavLink to="/mock/create" className="nav-link mb-2 py-2 px-3">
          👤 Create Mock
        </NavLink>
      </nav>
    </div>
  );
}