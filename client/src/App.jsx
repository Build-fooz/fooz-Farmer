import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Dashboard from './Pages/Dashboard';
import DeliveryDashboard from './Pages/DeliveryDashboard';
import Home from './Pages/HomePage';
import ProductListing from './Pages/ProductListing';
import NotFound from './Pages/NotFound';
import AuthForm from "./Pages/AuthForm";
import RegisterForm from "./Pages/RegisterForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/userdashboard" element={<Dashboard />} />

        {/* Add a route without an ID to redirect to a default delivery */}
        <Route path="/deliverydashboard" element={<DeliveryDashboard deliveryId="default-id" />} />
        {/* Keep the dynamic ID route */}
        <Route path="/deliverydashboard/:deliveryId" element={<DeliveryDashboard />} />

        <Route path="/productListing" element={<ProductListing />} />
        <Route path="/Register" element={<RegisterForm />} />
        <Route path="/auth" element={<AuthForm />} />
        <Route path="*" element={<NotFound />} /> {/* Handles unknown routes */}
      </Routes>
    </Router>
  );
}

export default App;
