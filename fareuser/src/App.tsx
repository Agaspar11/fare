import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomeScreen from "./user/Welcome";
import Login from "./user/Login"; // Import Login component
import Register from "./user/Register";
import Homepage from "./user/Homepage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/user/Login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/homepage" element={<Homepage />} />
      </Routes>
    </Router>
  );
};

export default App;
