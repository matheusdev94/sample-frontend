import "./App.css";
// import { Components } from "./Components/Components";
import { Components } from "./Components";
import React from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Login from "./routes/login";
import Register from "./routes/register";
import Home from "./routes/home";
import Unauthorized from "./routes/unauthorized";
import Editor from "./routes/editor";
import Admin from "./routes/admin";
import Lounge from "./routes/lounge";
import Missing from "./routes/missing";
import RequireAuth from "./Components/RequireAuth";

const ROLES = {
  User: 2001,
  Editor: 1984,
  Admin: 1984,
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* protected routes */}
        <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="editor" element={<Editor />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="admin" element={<Admin />} />
        </Route>
        <Route
          element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Editor]} />}
        >
          <Route path="lounge" element={<Lounge />} />
        </Route>

        {/* call all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
{
  /* <Components /> */
}
