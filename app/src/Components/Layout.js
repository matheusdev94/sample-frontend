import React from "react";
import SelectLanguage from "./selectLanguage/SelectLanguage";
import { Outlet } from "react-router-dom";
import "./Layout.css";
const Layout = () => {
  return (
    <main className="App">
      <SelectLanguage />
      <Outlet />
    </main>
  );
};

export default Layout;
