import React, { useEffect } from "react";
import { Link as Links, useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import useAuth from "../hooks/useAuth";
import useRefreshToken from "../hooks/useRefreshToken";

import { useSelector } from "react-redux";
import { languages } from "../strings/strings";

import "./Link.css";
const Link = () => {
  const language = useSelector((state) => state.language.language);

  const { auth } = useAuth();
  const navigate = useNavigate();
  const logout = useLogout();
  const refresh = useRefreshToken();
  useEffect(() => {
    try {
      refresh();
    } catch (e) {
      console.error(e);
    }
  }, []);
  const signOut = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="content">
      <h1>{languages[language].links}</h1>
      <h2>{languages[language].textPublic}</h2>
      <Links
        className={auth.accessToken ? "link-disabled" : "link"}
        to="/register"
      >
        {languages[language].textRegister}
      </Links>
      <Links
        className={auth.accessToken ? "link-disabled" : "link"}
        to="/login"
      >
        {languages[language].textLogin}
      </Links>

      <h2>{languages[language].textPrivate}</h2>
      <Links className="link" to="/admin">
        {languages[language].textAdmin}
      </Links>
      <Links className="link" to="/editor">
        {languages[language].textEditor}
      </Links>
      <Links className="link" to="/lounge">
        {languages[language].textLounge}
      </Links>
      <br />
      <button onClick={() => signOut()}>
        {languages[language].textSignOut}
      </button>
    </div>
  );
};

export default Link;
