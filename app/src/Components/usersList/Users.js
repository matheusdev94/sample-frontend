import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import "./Users.css";
const UserItems = ({ users }) => {
  // Return the JSX elements inside the map function
  return users.map((user, index) => {
    return <li key={index}>{user?.username}</li>;
  });
};

const Users = () => {
  const [users, setUsers] = useState();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getUser = async () => {
      try {
        const response = await axiosPrivate.get("/users", {
          signal: controller.signal,
        });
        isMounted && setUsers(response.data);
      } catch (err) {
        console.error("Error on fetch Users ", err);
      }
    };
    getUser();

    return () => {
      isMounted = false;
      // !isMounted && controller.abort();
      // controller.abort(); //👌
    };
  }, [axiosPrivate]);

  return (
    <article>
      <h1>Users List</h1>
      {users?.length ? (
        <ul className="user-list">
          <UserItems users={users} />
        </ul>
      ) : (
        <p>Sem Usuários</p>
      )}
    </article>
  );
};

export default Users;
