import React from "react";
import EmployeeForm from "../Components/editor/EmployeeForm";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { languages } from "../strings/strings";

const AddEmployee = () => {
  const language = useSelector((state) => state.language.language);

  return (
    <section className="content">
      <h1>{languages[language].AddEmployeeTitle}</h1>
      <EmployeeForm />
      <Link to="/editor" className="home-btn">
        {languages[language].back}
      </Link>
    </section>
  );
};

export default AddEmployee;
