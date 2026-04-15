export default function AccountProfile({ id, name, email, phone, onChange }) {
  const fields = [
    { label: "Full Name", name: "name", value: name },
    { label: "Email Address", name: "email", value: email },
    { label: "Phone", name: "phone", value: phone },
  ];

  return (
    <div className="card border-0 shadow-sm h-100">
      <div className="card-body p-4">
        <h5 className="fw-bold text-primary mb-4">Account Profile</h5>

        {fields.map((field) => (
          <div className="mb-3" key={field.name}>
            <label className="form-label small fw-semibold text-muted">
              {field.label}
            </label>
            <input
              className="form-control"
              name={field.name}
              value={field.value}
              onChange={onChange}
            />
          </div>
        ))}

        <div className="mt-4 p-3 bg-light rounded small text-muted border">
          Customer ID:
          <br />
          <code className="text-break">{id}</code>
        </div>
      </div>
    </div>
  );
}