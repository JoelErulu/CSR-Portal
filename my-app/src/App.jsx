import { BrowserRouter, Routes, Route } from "react-router-dom";

import CreateCustomer from "./pages/CreateCustomer.jsx";
import CustomerServicePortal from './pages/CustomerServicePortal'
import CustomerDetails from "./pages/CustomerDetails.jsx";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CustomerServicePortal />} />
        <Route path="/mock/create" element={<CreateCustomer />} />
        <Route path="/customers/:id" element={<CustomerDetails />} />
      </Routes>
    </BrowserRouter>
  );
}