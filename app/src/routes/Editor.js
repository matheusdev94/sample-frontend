import React from "react";
import { Link, useNavigate } from "react-router-dom";
import EmployeeList from "../Components/editor/EmployeeList";
const Editor = () => {
  const navigate = useNavigate();

  return (
    <div className="content">
      <h1>Editor</h1>
      <EmployeeList />
      <button onClick={() => navigate("/add-employee")}>+ Employee</button>
      <Link to="/" className="home-btn">
        Back
      </Link>
    </div>
  );
};

export default Editor;
