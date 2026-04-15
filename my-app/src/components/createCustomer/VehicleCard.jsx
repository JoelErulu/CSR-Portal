export default function VehicleCard({
  car,
  index,
  plans,
  onChange,
  onRemove,
  showRemove,
}) {
  return (
    <div className="card shadow-sm mb-3 p-3">

      <div className="d-flex justify-content-between mb-2">
        <strong>Vehicle #{index + 1}</strong>
        {showRemove && (
          <button className="btn btn-sm text-danger" onClick={() => onRemove(index)}>
            Remove
          </button>
        )}
      </div>

      <div className="row g-2 mb-2">
        <input
          className="form-control col"
          name="vin"
          placeholder="VIN"
          value={car.vin}
          onChange={(e) => onChange(index, e)}
        />
        <input
          className="form-control col"
          name="make"
          placeholder="Make"
          value={car.make}
          onChange={(e) => onChange(index, e)}
        />
        <input
          className="form-control col"
          name="model"
          placeholder="Model"
          value={car.model}
          onChange={(e) => onChange(index, e)}
        />
      </div>

      <div className="row g-2">
        <select
          className="form-select"
          name="planId"
          value={car.planId}
          onChange={(e) => onChange(index, e)}
        >
          <option value="">Select Plan</option>
          {plans.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

      </div>
    </div>
  );
}