// import React from "react";
// import SelectLanguage from "./selectLanguage/SelectLanguage";
// import { Outlet } from "react-router-dom";
// import "./Layout.css";
// const Layout = () => {
//   return (
//     <main className="App">
//       <SelectLanguage />
//       <Outlet />
//     </main>
//   );
// };

// export default Layout;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import React, { useState } from "react";

import RightSideBar from "./sideBar/rightSideBar/RightSideBar";
import LeftSideBar from "./sideBar/leftSideBar/LeftSidebar";
import CartButton from "./button/cartButton/CartButton";
import { WhatsAppButton } from "./whatsapp/Whatsapp";
import { NavBar } from "./navBar/Navbar";
import Footer from "./footer/Footer";

import SelectLanguage from "./selectLanguage/SelectLanguage";

import { useSelector } from "react-redux";
import { themeColors } from "../themes/styles";
// import AppRouter from "../AppRouter";

import "./Layout.css";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  const themeMode = useSelector((state) => state.theme.mode);
  const [leftsideBarState, setSideBarState] = useState("close");

  const changeLeftSideBarState = () => {
    if (leftsideBarState === "open") {
      setSideBarState("close");
    } else {
      setSideBarState("open");
    }
  };
  return (
    <main
      className="App"
      style={{
        backgroundColor: themeColors[themeMode].backgroundColor,
        color: themeColors[themeMode].textColor,
      }}
    >
      {/* <SelectLanguage /> */}
      <div className="components-container">
        <NavBar changeSideBarState={changeLeftSideBarState} />
        {/* <News /> */}
        <LeftSideBar
          sideBarState={leftsideBarState}
          changeSideBarState={changeLeftSideBarState}
        />
        <CartButton />
        <RightSideBar />
        <div className="mutable-content">
          <Outlet />
        </div>
        <Footer />
        <a
          href={process.env.REACT_APP_WHATSAPP_LINK}
          target="_blank"
          style={{ background: "transparent", border: "none" }}
        >
          <WhatsAppButton />
        </a>
      </div>
    </main>
  );
};
export default Layout;
