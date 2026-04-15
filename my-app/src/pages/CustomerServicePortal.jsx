import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCustomers } from "../firebase/customerService";
import CsrNavbar from "../components/navbar/CsrNavbar";

import LoadingScreen from "../components/loading/LoadingScreen";
import Header from "../components/customerServicePortal/Header";
import CustomerList from "../components/customerServicePortal/CustomerList";

export default function CustomerServicePortal() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getCustomers()
      .then(setCustomers)
      .finally(() => setLoading(false));
  }, []);

  const filtered = customers.filter((c) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      c.name?.toLowerCase().includes(q) ||
      c.email?.toLowerCase().includes(q) ||
      c.phone?.includes(q)
    );
  });

  if (loading) return <LoadingScreen />;

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
          <div className="d-flex flex-column flex-md-row">
                <CsrNavbar />
        <div className="flex-grow-1 p-3 p-lg-4">
          <Header search={search} setSearch={setSearch} />
          <CustomerList
            customers={filtered}
            onClick={(id) => navigate(`/customers/${id}`)}
          />
          <div className="mt-3 text-muted small">
            Showing {filtered.length} of {customers.length}
          </div>
        </div>
      </div>
    </div>
  );
}