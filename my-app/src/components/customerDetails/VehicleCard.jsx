export default function VehicleCard({
  car,
  index,
  onChange,
  onRemove,
  onToggle,
}) {
  const {
    vin = "",
    make = "",
    model = "",
    washType = "",
    subscriptionActive = true,
  } = car;

  const fields = [
    { name: "vin", value: vin, placeholder: "VIN" },
    { name: "make", value: make, placeholder: "Make" },
    { name: "model", value: model, placeholder: "Model" },
  ];

  return (
    <div className="card border-0 shadow-sm mb-3">
      <div className="card-header bg-white d-flex justify-content-between align-items-center">
        <span className={`badge ${subscriptionActive ? "bg-success" : "bg-danger"}`}>
          {subscriptionActive ? "Active" : "Canceled"}
        </span>

        <button className="btn btn-link text-danger btn-sm" onClick={() => onRemove(index)}>
          Remove
        </button>
      </div>

      <div className="card-body">
        <div className="row g-3">
          {fields.map((field) => (
            <div className="col-md-4" key={field.name}>
              <input
                className="form-control form-control-sm"
                {...field}
                onChange={(e) => onChange(index, e)}
              />
            </div>
          ))}

          <div className="col-md-4">
            <select
              className="form-select form-select-sm"
              name="washType"
              value={washType}
              onChange={(e) => onChange(index, e)}
            >
              <option value="">Select Wash Type</option>
              <option value="basic">Basic</option>
              <option value="premium">Premium</option>
              <option value="ultimate">Ultimate</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card-footer text-end bg-light">
        <button
          className={`btn btn-sm ${
            subscriptionActive ? "btn-outline-danger" : "btn-outline-success"
          }`}
          onClick={() => onToggle(index)}
        >
          {subscriptionActive ? "Cancel" : "Reactivate"}
        </button>
      </div>
    </div>
  );
}