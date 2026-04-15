export default function Header({ search, setSearch }) {
  return (
    <div className="row align-items-center mb-4 g-3">
      <div className="col-12 col-md">
        <h2 className="fw-bold mb-1">Customer Service Portal</h2>
        <p className="text-muted small mb-0">
          Manage subscriptions and client vehicle data
        </p>
      </div>

      <div className="col-12 col-md-8">
        <input
          className="form-control form-control-lg border-0 shadow-sm"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
  );
}