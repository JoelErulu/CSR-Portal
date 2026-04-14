import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function CustomerServicePortal() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const snapshot = await getDocs(collection(db, "customers"));

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setCustomers(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Customer Service Portal</h2>

      {customers.length === 0 ? (
        <p>No customers found</p>
      ) : (
        customers.map((customer) => (
          <div key={customer.id}>
            <p>Name: {customer.name}</p>
            <p>Email: {customer.email}</p>
            <p>Phone: {customer.phone}</p>
            <p>VIN: {customer.vin}</p>
            <p>Make: {customer.make}</p>
            <p>Model: {customer.model}</p>
            <p>Plan: {customer.planName || customer.plan}</p>
            <p>Status: {customer.active ? "Active" : "Inactive"}</p>
            <hr />
          </div>
        ))
      )}
    </div>
  );
}