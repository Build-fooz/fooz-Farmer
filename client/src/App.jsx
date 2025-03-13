import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './Pages/Dashboard'
import DeliveryDashboard from './Pages/DeliveryDashboard'
import Home from './Pages/HomePage'
import ProductListing from './Pages/ProductListing'
import NotFound from './Pages/NotFound'
import AuthForm from "./Pages/AuthForm";
import RegisterForm from "./Pages/RegisterForm";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/about" element={<About />} /> */}
        <Route path="/userdashboard" element= {<Dashboard/>} />
        <Route path="/deliverydashboard" element= {<DeliveryDashboard/>} />
        <Route path="/productlisting" element= {<ProductListing/>} />
        <Route path="/Register" element={<RegisterForm />} />
        <Route path="/Login" element={<AuthForm />} />
        <Route path="*" element={<NotFound />} /> {/* Handles unknown routes */}
      </Routes>
    </Router>
  );
}

export default App;
