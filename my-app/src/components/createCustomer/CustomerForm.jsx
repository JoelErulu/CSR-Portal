export default function CustomerForm({ form, onChange }) {
  return (
    <div className="card shadow-sm p-4">
      <h5 className="fw-bold mb-3">Customer Info</h5>

      {[
        { name: "name", placeholder: "Full Name" },
        { name: "email", placeholder: "Email", type: "email" },
        { name: "phone", placeholder: "Phone" },
      ].map((f) => (
        <input
          key={f.name}
          className="form-control mb-2"
          {...f}
          value={form[f.name]}
          onChange={onChange}
        />
      ))}
    </div>
  );
}