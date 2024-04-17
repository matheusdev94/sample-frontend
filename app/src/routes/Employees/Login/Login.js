import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

import useInput from "../hooks/useInput";
import useToggle from "../hooks/useToggle";

import "./Login.css";

const LOGIN_URL = "/auth/";

const Login = () => {
  const { setAuth } = useAuth();

  const navigateTo = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [loading, setLoading] = useState(false);

  const [username, resetUser, userAttribs] = useInput("username", "");
  const [password, setPassword] = useState("");

  const [errMsg, setErrMsg] = useState("");

  const [check, toggleCheck] = useToggle("persist", false);

  const [changePage, setChangePage] = useState(false);

  useEffect(() => {
    userRef.current.focus();
    const verifyRefreshToken = async () => {
      await axios
        .get("/refresh", {
          withCredentials: true,
        })
        .catch((e) => {
          console.error(e);
        })
        .then((response) => {
          response?.data?.accessToken && navigateTo("/link");
        });
    };

    verifyRefreshToken();
  }, []);

  useEffect(() => {}, []);

  useEffect(() => {
    setErrMsg("");
  }, [password, username]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrMsg(null);
    setLoading(true);

    await axios
      .post(
        LOGIN_URL,
        JSON.stringify({ username: username, password: password }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        const accessToken = res?.data?.accessToken;
        const roles = res?.data?.roles;
        setAuth({ username, roles, accessToken });
        resetUser();
        setPassword("");
        navigateTo(from, { replace: true });
      })
      .catch((err) => {
        if (!err?.response) {
          setErrMsg("No response from server.");
        } else if (
          err.response?.status === 401 ||
          err.response?.status === 403
        ) {
          setErrMsg("Unauthorized.");
        } else {
          setErrMsg("Login Failed.");
        }
        errRef.current.focus();
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
        if (errMsg !== null) {
          setChangePage("erro");
        } else {
          setChangePage(true);
        }
      });
  };
  return (
    <section
      className={`login-content${
        changePage === true ? "-out" : changePage === "erro" ? "-err" : ""
      }`}
    >
      <h1>Login</h1>
      {errMsg ? (
        <p
          ref={errRef}
          className={errMsg ? "loading-msg" : "loading-msg-hidden"}
        >
          {errMsg}
        </p>
      ) : (
        <p
          ref={errRef}
          className={loading ? "loading-msg" : "loading-msg-hidden"}
        >
          Loading...
        </p>
      )}
      <form className="login-form" onSubmit={handleSubmit}>
        {/* USERNAME */}

        <div className="input-container">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="text-input"
            ref={userRef}
            // onChange={(e) => setUsername(e.target.value)}
            // value={username}
            {...userAttribs}
            required
            maxLength={50}
          />
        </div>
        {/* PASSWORD */}
        <div className="input-container">
          <label htmlFor="pwd">Password</label>
          <input
            className="text-input"
            autoComplete="on"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            maxLength={50}
          />
        </div>
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

        <button className="button">Login</button>
        <p className="form-sugestion">
          Dont have a account yet?
          <Link to="/register" className="to-login-register-link">
            Assign now
          </Link>
        </p>
      </form>
    </section>
  );
};
export default Login;
