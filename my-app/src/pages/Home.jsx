import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>CSR System</h1>

      <button onClick={() => navigate("/mock/subscriptions")}>
        Create Mock Customer Data
      </button>

      <button onClick={() => navigate("/csr")} style={{ marginLeft: 10 }}>
        Customer Service Portal
      </button>
    </div>
  );
}