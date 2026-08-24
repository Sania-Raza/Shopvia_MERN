
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ActivationPage, Home,LoginPage, SignupPage } from "./Routes.jsx";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/activation/:token" element={<ActivationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
