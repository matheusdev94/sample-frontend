import React, { useState, useEffect } from "react";
import useRefreshToken from "../../hooks/useRefreshToken";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

import EmployeeItem from "./EmployeeItem";

import { useSelector } from "react-redux";
import { languages } from "../../strings/strings";

import "./EmployeeList.css";

const EmployeeList = () => {
  const language = useSelector((state) => state.language.language);

  const [antiCsrf, setAntiCsrf] = useState("");
  const [at, setAt] = useState("");
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState();

  const axiosPrivate = useAxiosPrivate();
  const refresh = useRefreshToken();

  useEffect(() => {
    let isMounted = true;
    const getEmployees = async () => {
      const controller = new AbortController();
      try {
        refresh().then(async () => {
          await axiosPrivate
            .get("/employees", {
              signal: controller.signal,
            })
            .then((r) => {
              setEmployees(r?.data);
            })
            .catch((e) => {
              console.error("err on get employees: ", e);
            });
        });
      } catch (err) {
        console.error("Error on fetch Users ", err);
      }
    };
    getEmployees();

    return () => {
      isMounted = false;
      // !isMounted && controller.abort();
      // controller.abort(); //👌
    };
  }, []);

  return (
    <article className="list-wrapper">
      <p>{languages[language].employeesList}</p>
      {employees?.length ? (
        <ul className="user-list">
          <EmployeeItem setEmployees={setEmployees} employees={employees} />
        </ul>
      ) : (
        <p>{languages[language].emptyList}</p>
      )}
    </article>
  );
};

export default EmployeeList;
