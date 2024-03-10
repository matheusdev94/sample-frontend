import React from "react";
import { Link } from "react-router-dom";

const Editor = () => {
  return (
    <div className="content">
      <h1>Editor</h1>
      <Link to="/" className="home-btn">
        Home
      </Link>
    </div>
  );
};

export default Editor;
