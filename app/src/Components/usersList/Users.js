import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useRefreshToken from "../../hooks/useRefreshToken";
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

  const refresh = useRefreshToken();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUser = async () => {
      try {
        await refresh().then(async () => {
          const response = await axiosPrivate.get("/users", {
            signal: controller.signal,
          });
          isMounted && setUsers(response.data);
        });
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
  }, []);

  return (
    <article className="list-wrapper">
      <h2>Users List</h2>
      {users?.length ? (
        <ul className="lists">
          <UserItems users={users} />
        </ul>
      ) : (
        <p>Sem usuários.</p>
      )}
    </article>
  );
};

export default Users;
