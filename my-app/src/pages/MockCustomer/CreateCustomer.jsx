import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";

export default function CreateCustomer() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    vin: "",
    make: "",
    model: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submit = async () => {
    const plan = localStorage.getItem("selectedPlan");

    if (!plan) {
      alert("No subscription plan selected");
      return;
    }

    if (
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.vin ||
      !form.make ||
      !form.model
    ) {
      alert("Please fill out all fields");
      return;
    }

    try {
      setLoading(true);

      const docRef = await addDoc(collection(db, "customers"), {
        ...form,
        plan,
        active: true,
        createdAt: new Date(),
      });

      console.log("Customer created:", docRef.id);

      navigate("/success");
    } catch (err) {
      console.error("Firestore error:", err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto" }}>
      <h2>Create Customer</h2>

      <input name="name" value={form.name} placeholder="Name" onChange={handleChange} />
      <input name="email" value={form.email} placeholder="Email" onChange={handleChange} />
      <input name="phone" value={form.phone} placeholder="Phone" onChange={handleChange} />
      <input name="vin" value={form.vin} placeholder="VIN" onChange={handleChange} />
      <input name="make" value={form.make} placeholder="Make" onChange={handleChange} />
      <input name="model" value={form.model} placeholder="Model" onChange={handleChange} />

      <button onClick={submit} disabled={loading}>
        {loading ? "Creating..." : "Create Customer"}
      </button>
    </div>
  );
}