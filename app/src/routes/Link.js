import React from "react";
import { Link as Links } from "react-router-dom";

const Link = () => {
  return (
    <div className="content">
      <h1>Links</h1>
      <h2>Public</h2>
      <Links className="link" to="/register">
        Register
      </Links>
      <br />
      <Links className="link" to="/login">
        Login
      </Links>

      <br />
      <h2>Private</h2>
      <Links className="link" to="/admin">
        Go to Admin's Page
      </Links>
      <br />
      <Links className="link" to="/editor">
        Go to Editor's Page
      </Links>
      <br />
      <Links className="link" to="/lounge">
        Go to Louge's Page
      </Links>
      <br />
    </div>
  );
};

export default Link;
