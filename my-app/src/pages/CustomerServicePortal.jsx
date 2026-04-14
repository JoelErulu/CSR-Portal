import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCustomers } from "../firebase/customerService";
import CsrNavbar from "../components/navbar/CsrNavbar";

export default function CustomerServicePortal() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await getCustomers();
        setCustomers(data);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  const filtered = customers.filter((c) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      c.name?.toLowerCase().includes(q) ||
      c.email?.toLowerCase().includes(q) ||
      c.phone?.includes(q)
    );
  });

  if (loading) {
    return (
      <div className="vh-100 d-flex justify-content-center align-items-center bg-light">
        <div className="spinner-grow text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex bg-light min-vh-100">
      <CsrNavbar />

      <div className="flex-grow-1 p-4 dashboard-container">
        <div className="row align-items-center mb-4">
          <div className="col">
            <h2 className="fw-bold text-dark mb-1">Customer Service Portal</h2>
            <p className="text-muted small mb-0">Manage subscriptions and client vehicle data</p>
          </div>
          <div className="col-md-4">
            <input
              className="form-control form-control-lg border-0 shadow-sm search-input"
              placeholder="Search by name, email, or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-white border-bottom">
                <tr>
                  <th className="ps-4 py-3 text-muted small text-uppercase fw-bold">Customer</th>
                  <th className="py-3 text-muted small text-uppercase fw-bold">Contact Info</th>
                  <th className="py-3 text-muted small text-uppercase fw-bold">Vehicles</th>
                  <th className="py-3 text-muted small text-uppercase fw-bold text-center">Plan Status</th>
                  <th className="pe-4 py-3 text-muted small text-uppercase fw-bold text-end">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {filtered.length > 0 ? (
                  filtered.map((customer) => {
                    const cars = customer.cars || [];
                    const active = cars.some(c => c.subscriptionActive !== false);
                    const canceled = cars.some(c => c.subscriptionActive === false);

                    let statusUI;
                    if (cars.length === 0) statusUI = <span className="badge status-pill bg-light text-dark border">No Data</span>;
                    else if (active && canceled) statusUI = <span className="badge status-pill bg-warning text-dark">Partial Plan</span>;
                    else if (active) statusUI = <span className="badge status-pill bg-success-subtle text-success border border-success-subtle">Fully Active</span>;
                    else statusUI = <span className="badge status-pill bg-danger-subtle text-danger border border-danger-subtle">Canceled</span>;

                    return (
                      <tr 
                        key={customer.id} 
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate(`/customers/${customer.id}`)}
                      >
                        <td className="ps-4 py-3">
                          <div className="d-flex align-items-center">
                            <div className="rounded-circle bg-primary bg-opacity-10 text-primary d-flex align-items-center justify-content-center fw-bold me-3" style={{ width: '40px', height: '40px' }}>
                              {customer.name?.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <div className="fw-bold text-dark">{customer.name}</div>
                              <div className="text-muted small">UID: {customer.id.substring(0, 8)}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3">
                          <div className="text-dark small fw-medium">{customer.email}</div>
                          <div className="text-muted smaller">{customer.phone}</div>
                        </td>
                        <td className="py-3">
                          <div className="d-flex flex-column gap-1">
                            {cars.length ? (
                              cars.slice(0, 2).map((car, i) => (
                                <span key={i} className="text-truncate" style={{ maxWidth: '150px', fontSize: '0.85rem' }}>
                                  🚗 {car.make} {car.model}
                                </span>
                              ))
                            ) : (
                              <span className="text-muted small fst-italic">None</span>
                            )}
                            {cars.length > 2 && <span className="text-primary smaller">+{cars.length - 2} more...</span>}
                          </div>
                        </td>
                        <td className="py-3 text-center">
                          {statusUI}
                          <div className="smaller text-muted mt-1">{customer.planName || "Standard"}</div>
                        </td>
                        <td className="pe-4 py-3 text-end">
                          <button className="btn btn-sm btn-light border rounded-pill px-3">View Details</button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-5">
                      <div className="text-muted fw-light">No customers match your search criteria.</div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="d-flex justify-content-between mt-3 px-2">
          <p className="text-muted small">Showing {filtered.length} of {customers.length} total customers</p>
          <div className="d-flex gap-2">
            <div className="d-flex align-items-center gap-1 smaller">
               <span className="rounded-circle bg-success" style={{ width: 8, height: 8 }}></span> Active
            </div>
            <div className="d-flex align-items-center gap-1 smaller">
               <span className="rounded-circle bg-warning" style={{ width: 8, height: 8 }}></span> Partial
            </div>
            <div className="d-flex align-items-center gap-1 smaller">
               <span className="rounded-circle bg-danger" style={{ width: 8, height: 8 }}></span> Inactive
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}