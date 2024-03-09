import React from "react";

const Link = () => {
  return (
    <div>
      <h1>Links</h1>
      <h2>Public</h2>
      <a href="/register">register</a>
      <br />
      <a href="/login">login</a>
      <br />
      <h2>Private</h2>
      <a href="/">home</a>
      <br />
      <a href="/editor">editor</a>
      <br />
      <a href="/admin">admin</a>
      <br />
    </div>
  );
};

export default Link;
