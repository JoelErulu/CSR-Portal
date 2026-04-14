import { useEffect, useState } from "react";
import { getCustomerById, updateCustomer } from "../firebase/customerService";

export function useCustomer(id) {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getCustomerById(id);
        setCustomer(data);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  const handleAccountChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const handleCarChange = (index, e) => {
    const { name, value } = e.target;

    setCustomer((prev) => {
      const cars = [...(prev?.cars || [])];
      cars[index] = { ...cars[index], [name]: value };
      return { ...prev, cars };
    });
  };

  const addCar = () => {
    setCustomer((prev) => ({
      ...prev,
      cars: [
        ...(prev?.cars || []),
        {
          vin: "",
          make: "",
          model: "",
          washType: "basic",
          subscriptionActive: true,
        },
      ],
    }));
  };

  const removeCar = (index) => {
    setCustomer((prev) => ({
      ...prev,
      cars: (prev?.cars || []).filter((_, i) => i !== index),
    }));
  };

const toggleSubscription = (index) => {
  setCustomer((prev) => {
    const cars = [...(prev?.cars || [])];

    const current = cars[index]?.subscriptionActive ?? true;

    cars[index] = {
      ...cars[index],
      subscriptionActive: !current,
    };

    return { ...prev, cars };
  });
};

  const saveAll = async () => {
    setSaving(true);
    try {
      await updateCustomer(id, customer);
      alert("Changes saved!");
    } finally {
      setSaving(false);
    }
  };

  return {
    customer,
    loading,
    saving,
    handleAccountChange,
    handleCarChange,
    addCar,
    removeCar,
    toggleSubscription,
    saveAll,
  };
}