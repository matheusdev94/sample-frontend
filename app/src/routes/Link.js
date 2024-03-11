import React from "react";
import { Link as Links, useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";

const Link = () => {
  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate("/link");
  };
  return (
    <div className="content">
      <h1>Links</h1>
      <h2>Public</h2>
      <Links className="link" to="/register">
        Register
      </Links>
      <Links className="link" to="/login">
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
