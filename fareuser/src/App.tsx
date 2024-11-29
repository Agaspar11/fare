import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./user/Login";
import WelcomeScreen from "./user/Welcome";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
