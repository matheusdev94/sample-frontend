import React from "react";
import Users from "../Components/usersList/Users";
import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <section className="content">
      <h1>Admins Page</h1>
      <Users />
      <Link to="/" className="home-btn">
        Go to Home
      </Link>
    </section>
  );
};

export default Admin;
