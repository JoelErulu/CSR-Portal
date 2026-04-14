import { useParams, useNavigate } from "react-router-dom";
import { useCustomer } from "../hooks/useCustomer";

const LoadingScreen = () => (
  <div className="d-flex justify-content-center align-items-center vh-100">
    <div className="spinner-border text-primary" role="status" />
  </div>
);

const EmptyState = ({ text }) => (
  <div className="card border-0 shadow-sm p-4 text-center bg-white">
    <p className="text-muted mb-0">{text}</p>
  </div>
);

export default function CustomerDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    customer,
    loading,
    saving,
    handleAccountChange,
    handleCarChange,
    addCar,
    removeCar,
    toggleSubscription,
    saveAll,
  } = useCustomer(id);

  if (loading) return <LoadingScreen />;
  if (!customer) return <div className="container py-5 text-center">Customer not found</div>;

  const { name = "", email = "", phone = "", cars = [], purchaseHistory = [] } = customer;

  return (
    <div className="container py-4 bg-light min-vh-100">

      <div className="d-flex justify-content-between align-items-center mb-4 bg-white p-3 rounded shadow-sm">
        <button
          className="btn btn-outline-secondary btn-sm"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <button
          className="btn btn-primary px-4 fw-bold"
          onClick={saveAll}
          disabled={saving}
        >
          {saving ? (
            <span className="spinner-border spinner-border-sm me-2" />
          ) : (
            "Save Changes"
          )}
        </button>
      </div>

      <div className="row g-4">

        <div className="col-lg-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <h5 className="fw-bold text-primary mb-4">Account Profile</h5>

              {[
                { label: "Full Name", name: "name", value: name },
                { label: "Email Address", name: "email", value: email },
                { label: "Phone", name: "phone", value: phone },
              ].map((field) => (
                <div className="mb-3" key={field.name}>
                  <label className="form-label small fw-semibold text-muted">
                    {field.label}
                  </label>
                  <input
                    className="form-control"
                    name={field.name}
                    value={field.value}
                    onChange={handleAccountChange}
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
        </div>

        <div className="col-lg-8">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="fw-bold mb-0">Vehicle Subscriptions</h5>
            <button
              className="btn btn-success btn-sm px-3 rounded-pill"
              onClick={addCar}
            >
              + Add Vehicle
            </button>
          </div>

          {!cars.length && <EmptyState text="No vehicles registered to this account." />}

          {cars.map((car, index) => {
            const {
              vin = "",
              make = "",
              model = "",
              washType = "",
              subscriptionActive = true,
            } = car;

            return (
              <div key={index} className="card border-0 shadow-sm mb-3">

                <div className="card-header bg-white d-flex justify-content-between align-items-center">
                  <span
                    className={`badge ${
                      subscriptionActive ? "bg-success" : "bg-danger"
                    }`}
                  >
                    {subscriptionActive ? "Active" : "Canceled"}
                  </span>

                  <button
                    className="btn btn-link text-danger btn-sm"
                    onClick={() => removeCar(index)}
                  >
                    Remove
                  </button>
                </div>

                <div className="card-body">
                  <div className="row g-3">

                    {[
                      { name: "vin", value: vin, placeholder: "VIN" },
                      { name: "make", value: make, placeholder: "Make" },
                      { name: "model", value: model, placeholder: "Model" },
                    ].map((field) => (
                      <div className="col-md-4" key={field.name}>
                        <input
                          className="form-control form-control-sm"
                          {...field}
                          onChange={(e) => handleCarChange(index, e)}
                        />
                      </div>
                    ))}

                    <div className="col-md-4">
                      <select
                        className="form-select form-select-sm"
                        name="washType"
                        value={washType}
                        onChange={(e) => handleCarChange(index, e)}
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
                      subscriptionActive
                        ? "btn-outline-danger"
                        : "btn-outline-success"
                    }`}
                    onClick={() => toggleSubscription(index)}
                  >
                    {subscriptionActive ? "Cancel" : "Reactivate"}
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-5">
        <h5 className="fw-bold mb-3">Purchase History</h5>
        {!purchaseHistory.length && (
          <EmptyState text="No purchases found." />
        )}
      </div>
    </div>
  );
}