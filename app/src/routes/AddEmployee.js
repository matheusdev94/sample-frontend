import React from "react";
import EmployeeForm from "../Components/editor/EmployeeForm";
import { Link } from "react-router-dom";
const AddEmployee = () => {
  return (
    <section className="content">
      <h1>Add Employee</h1>
      <EmployeeForm />
      <Link to="/editor" className="home-btn">
        Back
      </Link>
    </section>
  );
};

export default AddEmployee;
