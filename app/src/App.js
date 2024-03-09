import "./App.css";
import React from "react";
// import { Provider } from "react-redux";
// import store from "./store/store";
import { Routes, Route } from "react-router-dom";
import Layout from "./routes/Layout";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Home from "./routes/Home";
import Unauthorized from "./routes/Unauthorized";
import Editor from "./routes/Editor";
import Admin from "./routes/Admin";
import Lounge from "./routes/Lounge";
import Missing from "./routes/Missing";
import RequireAuth from "./Components/RequireAuth";
import PersistLogin from "./Components/PersistLogin";
import Link from "./routes/Link";
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
            <Route path="/" element={<Home />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
            <Route path="editor" element={<Editor />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="admin" element={<Admin />} />
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
