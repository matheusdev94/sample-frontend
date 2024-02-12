// src/components/Home.js
import React from "react";

const handleSignOut = () => {
  console.log("DO THE SIGN OUT");
};
const Home = () => {
  return (
    <div>
      <h2>Home Page</h2>
      <p>Bem-vindo, {"NAME"}</p>
      <br />
      <a href="/editor">Editor</a>
      <br />
      <a href="/admin">Admin</a>
      <br />
      <a href="/lounge">Lounge</a>
      <br />
      <button onClick={() => handleSignOut}>Sign out</button>
    </div>
  );
};

export default Home;
