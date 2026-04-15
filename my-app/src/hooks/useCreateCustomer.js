import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createCustomer } from "../firebase/customerService";
import { getPlans } from "../firebase/planService";

export function useCreateCustomer() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [cars, setCars] = useState([{ vin: "", make: "", model: "", planId: "" }]);
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
    setCars((prev) => [...prev, { vin: "", make: "", model: "", planId: "" }]);

  const removeCar = (index) =>
    setCars((prev) => prev.filter((_, i) => i !== index));

  const submit = async () => {
    if (!form.name || !form.email || !form.phone)
      return alert("Complete customer information");

    for (const car of cars) {
      if (!car.vin || !car.make || !car.model || !car.planId)
        return alert("Fill all vehicle fields");
    }

    try {
      setLoading(true);
      await createCustomer({
        ...form,
        cars: cars.map((c) => ({ ...c, subscriptionActive: true })),
      });
      navigate("/");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    cars,
    plans,
    loading,
    handleFormChange,
    handleCarChange,
    addCar,
    removeCar,
    submit,
  };
}