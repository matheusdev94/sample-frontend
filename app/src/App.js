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

import PersistLogin from "./Components/PersistLogin";
import RequireAuth from "./Components/RequireAuth";
import Layout from "./Components/Layout";

const ROLES = {
  User: 2001,
  Editor: 1984,
  Admin: 5150,
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="link" element={<Link />} />

        {/* protected routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route path="" element={<Home />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
            <Route path="editor" element={<Editor />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="admin" element={<Admin />} />
          </Route>
          <Route
            element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />}
          >
            <Route path="editor" element={<Editor />} />
            <Route path="add-employee" element={<AddEmployee />} />
          </Route>
          <Route
            element={
              <RequireAuth
                allowedRoles={[ROLES.Admin, ROLES.User, ROLES.Editor]}
              />
            }
          >
            <Route path="lounge" element={<Lounge />} />
          </Route>
        </Route>
        {/* call all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
