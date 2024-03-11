import React, { useEffect } from "react";
import { Link as Links, useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import "./Link.css";
import useAuth from "../hooks/useAuth";
import useRefreshToken from "../hooks/useRefreshToken";
const Link = () => {
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
      <h1>Links</h1>
      <h2>Public</h2>
      <Links
        className={auth.accessToken ? "link-disabled" : "link"}
        to="/register"
      >
        Register
      </Links>
      <Links
        className={auth.accessToken ? "link-disabled" : "link"}
        to="/login"
      >
        Login
      </Links>

      <h2>Private</h2>
      <Links className="link" to="/admin">
        Go to Admin's Page
      </Links>
      <Links className="link" to="/editor">
        Go to Editor's Page
      </Links>
      <Links className="link" to="/lounge">
        Go to Louge's Page
      </Links>
      <br />
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
};

export default Link;
