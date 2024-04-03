import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

import useInput from "../hooks/useInput";
import useToggle from "../hooks/useToggle";

import { useSelector } from "react-redux";
import { languages } from "../strings/strings";

import "./Login.css";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const LOGIN_URL = "/auth/";

const Login = () => {
  const language = useSelector((state) => state.language.language);

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

  const axiosP = useAxiosPrivate();

  useEffect(() => {
    userRef.current.focus();
    const verifyRefreshToken = async () => {
      await axiosP
        .get("/refresh", {
          withCredentials: true,
        })
        .catch((e) => {
          console.error(e);
        })
        .then((response) => {
          console.clear();
          // alert(JSON.stringify(response));
          response?.data?.accessToken && navigateTo("/link");
        });
    };

    verifyRefreshToken();
  }, [navigateTo]);

  useEffect(() => {
    setErrMsg("");
  }, [password, username]);

  const loginGoogle = async () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/auth/google`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username.length < 1 || password.length < 1) {
      setErrMsg(languages[language].requiredInput);

      return;
    }
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
      <h1>{languages[language].textLogin}</h1>

      {errMsg ? (
        <p ref={errRef} className={errMsg ? "err-msg" : "loading-msg-hidden"}>
          {errMsg}
        </p>
      ) : (
        <p
          ref={errRef}
          className={loading ? "loading-msg" : "loading-msg-hidden"}
        >
          {languages[language].loading}
        </p>
      )}
      <form className="login-form" onSubmit={handleSubmit}>
        {/* USERNAME */}

        <div className="input-container">
          <label htmlFor="username">{languages[language].labelUsername}</label>
          <input
            type="text"
            className="text-input"
            ref={userRef}
            // onChange={(e) => setUsername(e.target.value)}
            // value={username}
            {...userAttribs}
            // required
            // title={languages[language].requiredInput}
            // oninvalid={`this.setCustomValidity('${languages[language].requiredInput}')`}
            maxLength={50}
          />
        </div>
        {/* PASSWORD */}
        <div className="input-container">
          <label htmlFor="pwd">{languages[language].labelPwd}</label>
          <input
            className="text-input"
            autoComplete="on"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // required
            // title={languages[language].requiredInput}
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
          <label htmlFor="checkbox">
            {languages[language].textTrustThisDevice}
          </label>
        </div>

        <button type="submit" className="button">
          {languages[language].textLogin}
        </button>
        <div className="login-division">
          <hr />
          <p>{languages[language].textOrLogin}</p>
        </div>
        <button
          type="button"
          onClick={() => {
            loginGoogle();
          }}
          className="button"
        >
          <FcGoogle size={"18px"} />
          {languages[language].textLoginButtonGoogle}
        </button>
        <p className="form-sugestion">
          {languages[language].textDontHaveAccount}

          <Link to="/register" className="to-login-register-link">
            {languages[language].textRegister}
          </Link>
        </p>
      </form>
    </section>
  );
};
export default Login;
