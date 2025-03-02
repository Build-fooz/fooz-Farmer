


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthForm from "./Pages/AuthForm";
import RegisterForm from "./Pages/RegisterForm";

function App() {
  return (


      <Router>
      <Routes>
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/" element={<AuthForm />} />
      </Routes>
    </Router>



  );
}

export default App;
