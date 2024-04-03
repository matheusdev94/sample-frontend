import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

import { useSelector } from "react-redux";
import { languages } from "../strings/strings";

import "./Lounge.css";
const Lounge = () => {
  const language = useSelector((state) => state.language.language);

  const { auth } = useAuth();

  return (
    <div className="content" id="content-lounge">
      <h1>{languages[language].textLounge}</h1>
      <p>
        {languages[language].welcome}, {auth.username ? auth.username : "User"}.
      </p>
      <Link to="/" className="home-btn">
        {languages[language].back}
      </Link>
    </div>
  );
};

export default Lounge;
