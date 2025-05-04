import './App.css'
import Dashboard from './Pages/Dashboard'
import DeliveryDashboard from './Pages/DeliveryDashboard'
import Home from './Pages/HomePage'
import ProductListing from './Pages/ProductListing'
import NotFound from './Pages/NotFound'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthForm from "./Pages/AuthForm";
import RegisterForm from "./Pages/RegisterForm";
import OrderPage from './Pages/OrderPage';
import ProductPage from './Pages/ProductPage';
import { AuthProvider } from './context/AuthContext'
import { AnalyticsProvider } from './context/AnalyticsContext'
import TestPage from './Pages/TestPage'
import ProductDetails from './Pages/ProductDetails'

// Wrap in try-catch to prevent blank page if there's an error
function SafeAuthProvider({ children }) {
  try {
    return <AuthProvider>{children}</AuthProvider>;
  } catch (error) {
    console.error("Error in AuthProvider:", error);
    return children;
  }
}

// Safe wrapper for AnalyticsProvider
function SafeAnalyticsProvider({ children }) {
  try {
    return <AnalyticsProvider>{children}</AnalyticsProvider>;
  } catch (error) {
    console.error("Error in AnalyticsProvider:", error);
    return children;
  }
}

function App() {
  return (
    <SafeAuthProvider>
      <Router>
        <Routes>
          <Route path="/test" element={<TestPage />} />
          <Route path="/" element={<Home />} />
          {/* <Route path="/about" element={<About />} /> */}
          
          {/* Wrap routes that need analytics data with AnalyticsProvider */}
          <Route path="/userdashboard" element={
            <SafeAnalyticsProvider>
              <Dashboard/>
            </SafeAnalyticsProvider>
          } />
          <Route path="/deliverydashboard" element={
            <SafeAnalyticsProvider>
              <DeliveryDashboard/>
            </SafeAnalyticsProvider>
          } />
          
          <Route path="/productListing" element={<ProductListing/>} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/auth" element={<AuthForm />} />
          <Route path="/order" element={<OrderPage/>} />
          <Route path="/productDetails" element={<ProductDetails/>}/>
          <Route path= "/products" element={
            <SafeAnalyticsProvider>
              <ProductPage/>
            </SafeAnalyticsProvider>
          }/>
          <Route path="*" element={<NotFound />} /> {/* Handles unknown routes */}
        </Routes>
      </Router>
    </SafeAuthProvider>
  );
}

export default App;
