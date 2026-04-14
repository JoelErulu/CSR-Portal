import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCustomer } from "../firebase/customerService";
import { getPlans } from "../firebase/planService";

import CsrSidebar from "../components/navbar/CsrNavbar";
import CustomerForm from "../components/createCustomer/CustomerForm";
import VehicleSection from "../components/createCustomer/VehicleSection";

export default function CreateCustomer() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [cars, setCars] = useState([
    { vin: "", make: "", model: "", planId: "", washType: "" },
  ]);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getPlans().then(setPlans);
  }, []);

  const handleFormChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleCarChange = (index, e) => {
    const { name, value } = e.target;
    setCars((prev) => {
      const updated = [...prev];
      updated[index][name] = value;
      return updated;
    });
  };

  const addCar = () =>
    setCars((prev) => [...prev, { vin: "", make: "", model: "", planId: "", washType: "" }]);

  const removeCar = (index) =>
    setCars((prev) => prev.filter((_, i) => i !== index));

  const submit = async () => {
    if (!form.name || !form.email || !form.phone) return alert("Fill customer info");

    for (const car of cars) {
      if (!car.vin || !car.make || !car.model || !car.planId)
        return alert("Fill all vehicle fields");
    }

    try {
      setLoading(true);

      await createCustomer({
        ...form,
        active: true,
        cars: cars.map((c) => ({
          ...c,
          subscriptionActive: true,
        })),
      });

      navigate("/");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex bg-light min-vh-100">
      <CsrSidebar />

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
  );
}

function Header() {
  return (
    <div className="mb-4">
      <h2 className="fw-bold">Onboard A New Customer</h2>
      <p className="text-muted">Register a new client</p>
    </div>
  );
}