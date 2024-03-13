import React, { useState, useEffect } from "react";
import useRefreshToken from "../../hooks/useRefreshToken";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import "./EmployeeList.css";

const EmployeeItem = ({ employees, setEmployees }) => {
  const axiosPrivate = useAxiosPrivate();
  const refresh = useRefreshToken();

  const getToken = async () => {
    await refresh().then(async () => {
      await axiosPrivate
        .get("/form", { withCredentials: true })
        .then((res) => {
          return res?.data?.formToken;
        })
        .catch((e) => console.error(e));
    });
  };

  const deleteUser = (id) => {
    try {
      refresh().then(async () => {
        const token = await getToken();
        console.log(token);
        await axiosPrivate
          .post(`/employees/delete`, JSON.stringify({ id }), {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          })
          .then((r) => {
            // setEmployees(r?.data);
            if (r.status === 204) {
              alert("Registro excluído.");
            } else {
              alert("Erro ao excluir registro.");
            }
          })
          .then(async () => {
            const controller = new AbortController();

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
          })
          .catch((e) => {
            console.error("err on get employees: ", e);
          });
      });
    } catch (err) {
      console.error("Error on fetch Users ", err);
    }
  };

  return employees.map((employee, index) => {
    return (
      <li key={index}>
        <div className="item-li">
          <p className="name-item-list">
            {employee?.lastname}, {employee?.firstname}
          </p>
          <button
            className="delete-employee-btn"
            onClick={() => {
              deleteUser(employee._id);
            }}
          >
            delete
          </button>
        </div>
      </li>
    );
  });
};

const EmployeeList = () => {
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
      <p>Employee List</p>
      {employees?.length ? (
        <ul className="user-list">
          <EmployeeItem setEmployees={setEmployees} employees={employees} />
        </ul>
      ) : (
        <p>No employees</p>
      )}
    </article>
  );
};

export default EmployeeList;
