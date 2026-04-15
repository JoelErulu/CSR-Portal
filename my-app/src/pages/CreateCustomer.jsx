import { useNavigate } from "react-router-dom";
import { useCreateCustomer } from "../hooks/useCreateCustomer";

import CsrNavbar from "../components/navbar/CsrNavbar";
import CustomerForm from "../components/createCustomer/CustomerForm";
import VehicleSection from "../components/createCustomer/VehicleSection";
import Header from "../components/createCustomer/Header";

export default function CreateCustomer() {
  const navigate = useNavigate();
  const {
    form,
    cars,
    plans,
    loading,
    handleFormChange,
    handleCarChange,
    addCar,
    removeCar,
    submit,
  } = useCreateCustomer();

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <div className="d-flex flex-column flex-md-row">
        <CsrNavbar />
        <div className="flex-grow-1 p-4">
          <div className="container" style={{ maxWidth: 900 }}>
            <Header />
            <div className="row g-4">
              <div className="col-lg-5">
                <CustomerForm form={form} onChange={handleFormChange} />
              </div>
              <div className="col-lg-7">
                <VehicleSection
                  cars={cars}
                  plans={plans}
                  onChange={handleCarChange}
                  onAdd={addCar}
                  onRemove={removeCar}
                  onSubmit={submit}
                  loading={loading}
                  onCancel={() => navigate("/")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}