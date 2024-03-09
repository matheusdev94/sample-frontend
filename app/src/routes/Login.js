import { useEffect, useRef, useState } from "react";

import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";

import useInput from "../hooks/useInput";
import useToggle from "../hooks/useToggle";
const LOGIN_URL = "/auth/";

const Login = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [username, resetUser, userAttribs] = useInput("username", "");
  const [password, setPassword] = useState("");

  const [errMsg, setErrMsg] = useState("");

  const [check, toggleCheck] = useToggle("persist", false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [password, username]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ username: username, password: password }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;

      setAuth({ username, roles, accessToken });
      // setUser()👇instead
      resetUser();
      setPassword("");
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No response from server.");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized.");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
      console.error(err);
    }
  };

  // const togglePersist = () => {
  //   setPersist(!persist);
  // };

  // useEffect(() => {
  //   localStorage.setItem("persist", persist);
  // }, [persist]);

  return (
    <section>
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>
        {errMsg}
      </p>
      <form className="login-form" onSubmit={handleSubmit}>
        {/* USERNAME */}
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          ref={userRef}
          // onChange={(e) => setUsername(e.target.value)}
          // value={username}
          {...userAttribs}
          required
        />

        {/* PASSWORD */}
        <label htmlFor="pwd">Password</label>
        <input
          autoComplete="on"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {/* CHECKBOX */}
        <div className="persist-checkbox">
          <input
            type="checkbox"
            id="checkbox-login"
            onChange={toggleCheck}
            checked={check}
          />
          <label htmlFor="checkbox">Trust this device</label>
        </div>

        <button>Entrar</button>
      </form>
    </section>
  );
};
export default Login;
