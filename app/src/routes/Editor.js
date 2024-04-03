import React from "react";
import { Link, useNavigate } from "react-router-dom";
import EmployeeList from "../Components/editor/EmployeeList";
import { useSelector } from "react-redux";
import { languages } from "../strings/strings";

const Editor = () => {
  const language = useSelector((state) => state.language.language);

  const navigate = useNavigate();

  return (
    <div className="content">
      <h1>{languages[language].editorPage}</h1>
      <EmployeeList />
      <button onClick={() => navigate("/add-employee")}>
        {languages[language].addEmployee}
      </button>
      <Link to="/" className="home-btn">
        {languages[language].back}
      </Link>
    </div>
  );
};

export default Editor;
