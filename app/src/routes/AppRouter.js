// src/AppRouter.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./home";
import About from "./about";
import Login from "./login";
import Register from "./register/register";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sobre" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registrar" element={<Register />} />
    </Routes>
  );
};

export default AppRouter;
