import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home.jsx";
import SubscriptionSelect from "./pages/MockCustomer/SubscriptionSelect";
import CreateCustomer from "./pages/MockCustomer/CreateCustomer";
import CustomerServicePortal from './pages/CustomerServicePortal'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/mock/subscriptions" element={<SubscriptionSelect />} />
        <Route path="/mock/create" element={<CreateCustomer />} />

       <Route path="/csr" element={<CustomerServicePortal />} />
      </Routes>
    </BrowserRouter>
  );
}