import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from './admin/Admin';
import User from './admin/User';
import Faremanage from './admin/Faremanage';
import Login from './admin/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/user" element={<User />} />
        <Route path="/faremanage" element={<Faremanage />} />
      </Routes>
    </Router>
  );
}

export default App;