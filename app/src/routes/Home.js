// src/components/Home.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import useAuth from "../hooks/useAuth";

import { useSelector } from "react-redux";
import { languages } from "../strings/strings";

const Home = () => {
  const language = useSelector((state) => state.language.language);

  const { auth } = useAuth();
  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate("/link");
  };
  return (
    <div className="content">
      <h1>{languages[language].textHomePage}</h1>
      <p>
        {languages[language].welcome}, {auth.username ? auth.username : "User"}.
      </p>

      <br />
      <Link className="link" to="/admin">
        {languages[language].textGoToAdm}
      </Link>
      <br />
      <Link className="link" to="/editor">
        {languages[language].textGoToEditor}
      </Link>
      <br />
      <Link className="link" to="/lounge">
        {languages[language].textGoToLounge}
      </Link>
      <br />

      <button onClick={() => signOut()}>
        {languages[language].textSignOut}
      </button>
    </div>
  );
};

export default Home;
