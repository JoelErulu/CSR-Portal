import VehicleCard from "./VehicleCard";

export default function VehicleSection({
  cars,
  plans,
  onChange,
  onAdd,
  onRemove,
  onSubmit,
  loading,
  onCancel,
}) {
  return (
    <>
      <div className="d-flex justify-content-between mb-3">
        <h5 className="fw-bold">Vehicles</h5>
        <button className="btn btn-outline-primary btn-sm" onClick={onAdd}>
          + Add
        </button>
      </div>

      {cars.map((car, i) => (
        <VehicleCard
          key={i}
          car={car}
          index={i}
          plans={plans}
          onChange={onChange}
          onRemove={onRemove}
          showRemove={cars.length > 1}
        />
      ))}

      <div className="mt-3">
        <button className="btn btn-primary w-100 mb-2" onClick={onSubmit} disabled={loading}>
          {loading ? "Creating..." : "Create Customer"}
        </button>

        <button className="btn btn-light w-100" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </>
  );
}