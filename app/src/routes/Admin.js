import React from "react";
import Users from "../Components/usersList/Users";
import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <section>
      <div>Admins Page</div>
      <br />
      <Users />
      <br />
      <div className="flexGrow">
        <Link to="/">Home</Link>
      </div>
    </section>
  );
};

export default Admin;
