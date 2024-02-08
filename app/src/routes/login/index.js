import { useEffect, useRef, useState, useContext } from "react";
import "./styles.css";
import axios from "../../api/axios";
import AuthContext from "../../context/AuthProvider";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";

const LOGIN_URL = "/auth";

const Login = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useLocalStorage("username", ""); //useState("");
  const [password, setPassword] = useState("");

  const [errMsg, setErrMsg] = useState("");

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
            credentials: "include",
          },
          withCredentials: true,
        }
      );
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ username, roles, accessToken });
      setUsername("");
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

  return (
    <>
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
            autoComplete="on"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
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

          <button>Entrar</button>
        </form>
      </section>
    </>
  );
};
export default Login;
