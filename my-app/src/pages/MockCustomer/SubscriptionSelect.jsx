import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function SubscriptionSelect() {
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const snapshot = await getDocs(collection(db, "plans"));

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPlans(data);
      } catch (err) {
        console.error("Error loading plans:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const selectPlan = (planId) => {
    localStorage.setItem("selectedPlan", planId);
    navigate("/mock/create");
  };

  if (loading) return <p>Loading plans...</p>;

  return (
    <div>
      <h2>Select Subscription</h2>

      {plans.map((plan) => (
        <div key={plan.id}>
          <button onClick={() => selectPlan(plan.id)}>
            {plan.name}
          </button>
        </div>
      ))}
    </div>
  );
}