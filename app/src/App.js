import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";

import Unauthorized from "./routes/Unauthorized";
import AddEmployee from "./routes/AddEmployee";
import Register from "./routes/Register";
import Missing from "./routes/Missing";
import Editor from "./routes/Editor";
import Lounge from "./routes/Lounge";
import Login from "./routes/Login";
import Admin from "./routes/Admin";
import Home from "./routes/Home";
import Link from "./routes/Link";

import HomePage from "./routes/Customer/home/home";
import Gallery from "./routes/Customer/gallery/gallery";
import Services from "./routes/Customer/services/services";
import Contact from "./routes/Customer/contact/contact";

import PersistLogin from "./Components/PersistLogin";
import RequireAuth from "./Components/RequireAuth";
import Layout from "./Components/Layout";
import ListContacts from "./routes/ListContacts/ListContacts";

const ROLES = {
  User: 2001,
  Editor: 1984,
  Admin: 5150,
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/galeria" element={<Gallery />} />
        <Route path="/servicos" element={<Services />} />
        <Route path="/contato" element={<Contact />} />

        {/* protected routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="admin" element={<ListContacts />} />
          </Route>
        </Route>
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
