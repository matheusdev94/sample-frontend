import React from "react";
import Users from "../Components/usersList/Users";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { languages } from "../strings/strings";

const Admin = () => {
  const language = useSelector((state) => state.language.language);

  return (
    <section className="content">
      <h1>{languages[language].adminsPage}</h1>
      <Users />
      <Link to="/" className="home-btn">
        {languages[language].back}
      </Link>
    </section>
  );
};

export default Admin;
