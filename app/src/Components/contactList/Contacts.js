import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useRefreshToken from "../../hooks/useRefreshToken";

import { useSelector } from "react-redux";
import { languages } from "../../strings/strings";

import "./Contacts.css";

const ContactItems = ({ contacts }) => {
  // Return the JSX elements inside the map function
  return contacts.map((contact, index) => {
    return (
      <li className="contact-item-list" key={index}>
        <div className="fisrt-row-contact-item">
          <p>Nome: {contact.username}</p>
          <p>
            {" " +
              contact.time.split("T")[0].split("-")[1] +
              "/" +
              contact.time.split("T")[0].split("-")[2] +
              "/" +
              contact.time.split("T")[0].split("-")[0] +
              " - " +
              contact.time.split("T")[1].substring(0, 8)}
          </p>
        </div>
        <p>Email: {contact.email}</p>
        <p>Telefone: {contact.phone}</p>
        <textarea
          className="contact-message"
          value={contact.message}
          rows="9"
          readOnly
        ></textarea>
      </li>
    );
    // console.log("ITEM CONTACT: ", contact);
  });
};

const Contacts = () => {
  const language = useSelector((state) => state.language.language);

  const [contacts, setContacts] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  const refresh = useRefreshToken();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchContacts = async () => {
      try {
        await refresh().then(async () => {
          const response = await axiosPrivate
            .get("/listContact", {
              signal: controller.signal,
            })
            .then((res) => {
              const data = res.data.contacts;
              setContacts(data);
              console.log("data: ", res.data.contacts);
              console.log("contacts: ", contacts);
            })
            .catch((e) => {
              console.error(e);
            });
        });
      } catch (err) {
        console.error("Error on fetch Users ", err);
      }
    };
    fetchContacts();

    return () => {
      isMounted = false;
      // !isMounted && controller.abort();
      // controller.abort(); //👌
    };
  }, []);

  return (
    <article className="list-wrapper">
      <h2 id="title-contacts">{languages[language].contactsTitle}</h2>
      {contacts?.length > 0 ? (
        <ul className="lists">{<ContactItems contacts={contacts} />}</ul>
      ) : (
        <p>{languages[language].emptyList}</p>
      )}
    </article>
  );
};

export default Contacts;
