function getStatusUI(cars) {
  const active = cars.some((c) => c.subscriptionActive !== false);
  const canceled = cars.some((c) => c.subscriptionActive === false);

  if (!cars.length)
    return <span className="badge bg-light text-dark border"> None </span>;
  if (active && canceled)
    return <span className="badge bg-warning text-dark">Partial</span>;
  if (active)
    return <span className="badge bg-success-subtle text-success">Active</span>;
  return <span className="badge bg-danger-subtle text-danger">Canceled</span>;
}

function Avatar({ name }) {
  return (
    <div
      className="rounded-circle bg-primary bg-opacity-10 text-primary d-flex align-items-center justify-content-center fw-bold me-2"
      style={{ width: 35, height: 35 }}
    >
      {name?.charAt(0).toUpperCase()}
    </div>
  );
}

function VehicleList({ cars = [] }) {
  if (!cars.length) return <span className="text-muted small">None</span>;

  return (
    <>
      {cars.slice(0, 2).map((c, i) => (
        <div key={i} className="small"> {c.make} {c.model}</div>
      ))}
      {cars.length > 2 && (
        <div className="text-primary small">+{cars.length - 2} more</div>
      )}
    </>
  );
}

export default function CustomerList({ customers, onClick }) {
  return (
    <div className="card border-0 shadow-sm">
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead>
            <tr>
              <th>Customer</th>
              <th className="d-none d-md-table-cell">Contact</th>
              <th className="d-none d-md-table-cell">Vehicles</th>
              <th className="text-center">Status</th>
            </tr>
          </thead>

          <tbody>
            {customers.length ? (
              customers.map((c) => (
                <tr
                  key={c.id}
                  onClick={() => onClick(c.id)}
                  style={{ cursor: "pointer" }}
                >
                  <td>
                    <div className="d-flex align-items-center">
                      <Avatar name={c.name} />
                      <div>
                        <div className="fw-bold">{c.name}</div>
                        <div className="text-muted small">
                          {c.id.substring(0, 8)}
                        </div>

                        {/* Mobile-only details */}
                        <div className="d-md-none text-muted small mt-1">
                          {c.email} • {c.phone}
                        </div>

                        <div className="d-md-none mt-1">
                          <VehicleList cars={c.cars} />
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Desktop only */}
                  <td className="d-none d-md-table-cell">
                    <div className="small">{c.email}</div>
                    <div className="text-muted small">{c.phone}</div>
                  </td>

                  <td className="d-none d-md-table-cell">
                    <VehicleList cars={c.cars} />
                  </td>

                  <td className="text-center">
                    {getStatusUI(c.cars || [])}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-5 text-muted">
                  No results
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}