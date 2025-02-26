// // import { useState } from 'react'
// import './App.css'
// import Dashboard from './Pages/Dashboard'
// import DeliveryDashboard from './Pages/DeliveryDashboard'
// import ProductListing from './Pages/ProductListing'
// import NotFound from './Pages/NotFound'
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// function App() {

//   return (
//     <Router>
//       <Routes>
//         {/* <Route path="/" element={<Home />} />
//         <Route path="/about" element={<About />} /> */}
//         <Route path="/userdashboard" element= {<Dashboard/>} />
//         <Route path="/deliverydashboard" element= {<DeliveryDashboard/>} />
//         <Route path="/productListing" element= {<ProductListing/>} />
//         <Route path="*" element={<NotFound />} /> {/* Handles unknown routes */}
//       </Routes>
//     </Router>
    
//   )
// }

// export default App


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthForm from "./Pages/AuthForm";
import RegisterForm from "./Pages/RegisterForm";

function App() {
  return (


      <Router>
      <Routes>
        <Route path="/Register" element={<RegisterForm />} />
        <Route path="/" element={<AuthForm />} />
      </Routes>
    </Router>



  );
}

export default App;
