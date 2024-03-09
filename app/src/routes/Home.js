// src/components/Home.js
import React from "react";
import { useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import useAuth from "../hooks/useAuth";

const Home = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const logout = useLogout();

  // alert(`auth: ${JSON.stringify(auth)}`);
  const signOut = async () => {
    await logout();
    navigate("/link");
  };
  return (
    <div>
      <h2>Home Page</h2>
      <p>Bem-vindo, {auth.username ? auth.username : "User"}</p>
      <br />
      <a href="/editor">Editor</a>
      <br />
      <a href="/admin">Admin</a>
      <br />
      <a href="/lounge">Lounge</a>
      <br />
      <a href="/link">Link</a>
      <br />
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
};

export default Home;
