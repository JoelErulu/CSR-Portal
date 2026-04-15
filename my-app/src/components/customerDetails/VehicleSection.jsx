import VehicleCard from "./VehicleCard";
import EmptyState from "../loading/EmptyState";

export default function VehicleSection({
  cars,
  addCar,
  handleCarChange,
  removeCar,
  toggleSubscription,
}) {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold mb-0">Vehicle Subscriptions</h5>

        <button className="btn btn-success btn-sm px-3 rounded-pill" onClick={addCar}>
          + Add A Vehicle
        </button>
      </div>

      {!cars.length && (
        <EmptyState text="No vehicles registered to this account." />
      )}

      {cars.map((car, index) => (
        <VehicleCard
          key={index}
          car={car}
          index={index}
          onChange={handleCarChange}
          onRemove={removeCar}
          onToggle={toggleSubscription}
        />
      ))}
    </div>
  );
}