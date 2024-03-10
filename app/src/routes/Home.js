// src/components/Home.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import useAuth from "../hooks/useAuth";

const Home = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate("/link");
  };
  return (
    <div className="content">
      <h1>Home Page</h1>
      <p>Welcome, {auth.username ? auth.username : "User"}.</p>

      <br />
      <Link className="link" to="/admin">
        Go to Admin's Page
      </Link>
      <br />
      <Link className="link" to="/editor">
        Go to Editor's Page
      </Link>
      <br />
      <Link className="link" to="/lounge">
        Go to Louge's Page
      </Link>
      <br />

      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
};

export default Home;
