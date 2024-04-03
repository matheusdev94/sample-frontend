import { FcGoogle } from "react-icons/fc";
import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";

import axios from "../api/axios";

import "./Register.css";
import SuccessRegistration from "./Success";
import Loading from "./Loading";

import { useSelector } from "react-redux";
import { languages } from "../strings/strings";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/register";

const Register = () => {
  const language = useSelector((state) => state.language.language);

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [matchPassword, setMatchPassword] = useState("");
  const [validMatchPassword, setValidMatchPassword] = useState(false);
  const [matchPasswordFocus, setMatchPasswordFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const [loading, setLoading] = useState(false);

  const loginGoogle = async () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/auth/google`;
  };
  const navigateTo = useNavigate();
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
  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);
  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
    setValidMatchPassword(password === matchPassword);
  }, [password, matchPassword]);
  useEffect(() => {
    setErrMsg("");
  }, [user, password, matchPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(password);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ username: user, password: password }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.status === 201) {
        setSuccess(true);
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
    setLoading(false);
  };
  return (
    <section className="form-wrapper">
      <div className="form-content">
        {success && <SuccessRegistration />}
        {loading && <Loading />}
        <h1>{languages[language].textRegister}</h1>
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>

        <form className="form" onSubmit={handleSubmit}>
          <div className="inputs-wrapper">
            {/* USER */}
            <div className="input-container">
              <label htmlFor="username">
                {languages[language].labelUsername}
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validName ? "valid" : "hide"}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validName || !user ? "hide" : "invalid"}
                />
              </label>
              <input
                className="text-input"
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                required
                aria-invalid={validName ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
                maxLength={50}
              />
              <p
                id="uidnote"
                className={
                  userFocus && user && !validName ? "instructions" : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                4 to 24 characters.
                <br />
                Must begin with a letter.
                <br />
                Letters, numbers, underscores, hyphens allowed.
              </p>
            </div>

            {/* PASSWORD */}
            <div className="input-container">
              <label htmlFor="password">
                {languages[language].labelPwd}
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validPassword ? "valid" : "hide"}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validPassword || !password ? "hide" : "invalid"}
                />
              </label>
              <input
                type="password"
                className="text-input"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                aria-invalid={validPassword ? "false" : "true"}
                aria-describedby="pwdnote"
                onFocus={() => setPasswordFocus(true)}
                onBlur={() => setPasswordFocus(false)}
                maxLength={50}
              />
              <p
                id="pwdnote"
                className={
                  passwordFocus && !validPassword ? "instructions" : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                8 to 24 characters.
                <br />
                Must include uppercase and lowercase letters, a number and a
                special character.
                <br />
                Allowed special characters:
                <span aria-label="exclamation mark">!</span>
                <span aria-label="at symbol">@</span>
                <span aria-label="hashtag">#</span>
                <span aria-label="dollar sign">$</span>
                <span aria-label="percent">%</span>
              </p>
            </div>
            {/* PASSWORD CONFIRMATION */}
            <div className="input-container">
              <label htmlFor="confirm_pwd">
                {languages[language].labelConfirmPwd}
                <FontAwesomeIcon
                  icon={faCheck}
                  className={
                    validMatchPassword && matchPassword ? "valid" : "hide"
                  }
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={
                    validMatchPassword || !matchPassword ? "hide" : "invalid"
                  }
                />
              </label>
              <input
                type="password"
                className="text-input"
                id="confirm_pwd"
                onChange={(e) => setMatchPassword(e.target.value)}
                value={matchPassword}
                required
                aria-invalid={validMatchPassword ? "false" : "true"}
                aria-describedby="confirmnote"
                onFocus={() => setMatchPasswordFocus(true)}
                onBlur={() => setMatchPasswordFocus(false)}
                maxLength={50}
              />
              <p
                id="confirmnote"
                className={
                  matchPasswordFocus && !validMatchPassword
                    ? "instructions"
                    : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                Must match the first password input field.
              </p>
            </div>
          </div>
          {/* SUBMIT BUTTON */}
          <button
            disabled={!validPassword || !validMatchPassword || !validName}
          >
            {languages[language].textRegister}
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
        </form>

        <p className="form-sugestion">
          {languages[language].alredyHaveAccText}
          {/* <br /> */}
          <Link to="/login" className="to-login-register-link">
            {languages[language].loginButton}
          </Link>
        </p>
      </div>
    </section>
  );
};
export default Register;
