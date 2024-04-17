import React from "react";
import Users from "../../Components/usersList/Users";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { languages } from "../../strings/strings";
import Contacts from "../../Components/contactList/Contacts";

const ListContacts = () => {
  const language = useSelector((state) => state.language.language);

  return (
    <section id="listcontacts-content" className="content">
      <h1>{languages[language].adminsPage}</h1>
      <Link to="/" className="home-btn">
        {languages[language].back}
      </Link>
      <Contacts />
    </section>
  );
};

export default ListContacts;
