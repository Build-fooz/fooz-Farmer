import './App.css'
import Dashboard from './Pages/Dashboard'
import DeliveryDashboard from './Pages/DeliveryDashboard'
import Home from './Pages/HomePage'
import ProductListing from './Pages/ProductListing'
import NotFound from './Pages/NotFound'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthForm from "./Pages/AuthForm";
import RegisterForm from "./Pages/RegisterForm";
import OrderPage from './Pages/OrderPage'
import ProductPage from './Pages/ProductPage';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/about" element={<About />} /> */}
        <Route path="/userdashboard" element= {<Dashboard/>} />
        <Route path="/deliverydashboard" element= {<DeliveryDashboard/>} />
        <Route path="/productListing" element= {<ProductListing/>} />
        <Route path="/Register" element={<RegisterForm />} />
        <Route path="/auth" element={<AuthForm />} />
        <Route path= "/order" element={<OrderPage/>}/>
        <Route path= "/product" element={<ProductPage/>}/>


        <Route path="*" element={<NotFound />} /> {/* Handles unknown routes */}
      </Routes>
    </Router>
  );
}

export default App;
