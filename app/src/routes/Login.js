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
    setLoading(true);
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
      navigateTo(from, { replace: true });
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="content">
      <h1>Login</h1>
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>
        {errMsg}
      </p>
      {loading && <p>Loading...</p>}
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
