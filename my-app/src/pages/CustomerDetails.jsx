import { useParams, useNavigate } from "react-router-dom";
import { useCustomer } from "../hooks/useCustomer";

import LoadingScreen from "../components/loading/LoadingScreen";
import CustomerHeader from "../components/customerDetails/CustomerHeader";
import AccountProfile from "../components/customerDetails/AccountProfile";
import VehicleSection from "../components/customerDetails/VehicleSection";
import PurchaseHistory from "../components/customerDetails/PurchaseHistory";

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

      <CustomerHeader
        onBack={() => navigate(-1)}
        onSave={saveAll}
        saving={saving}
      />

      <div className="row g-4">
        <div className="col-lg-4">
          <AccountProfile
            id={id}
            name={name}
            email={email}
            phone={phone}
            onChange={handleAccountChange}
          />
        </div>

        <div className="col-lg-8">
          <VehicleSection
            cars={cars}
            addCar={addCar}
            handleCarChange={handleCarChange}
            removeCar={removeCar}
            toggleSubscription={toggleSubscription}
          />
        </div>
      </div>

      <PurchaseHistory history={purchaseHistory} />
    </div>
  );
}