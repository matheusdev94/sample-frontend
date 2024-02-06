import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./styles.css";
import axios from "../../api/axios";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/register";

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [matchPassword, setMatchPassword] = useState("");
  const [validPasswordMatch, setValidMatchPassword] = useState(false);
  const [passwordFocusMatch, setPasswordFocusMatch] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
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
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(password);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ user, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response.data);
      console.log(response.accessToken);
      console.log(JSON.stringify(response));
      setSuccess(true);
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
  };
  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <a href="#">Sign in</a>
          </p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <form className="register-form" onSubmit={handleSubmit}>
            {/* USER */}
            <label htmlFor="username">
              Username:
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

            {/* PASSWORD */}
            <label htmlFor="password">
              Password:
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
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              aria-invalid={validPassword ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() => setPasswordFocus(true)}
              onBlur={() => setPasswordFocus(false)}
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

            {/* PASSWORD CONFIRMATION */}
            <label htmlFor="confirm_pwd">
              Confirm Password:
              <FontAwesomeIcon
                icon={faCheck}
                className={
                  validPasswordMatch && matchPassword ? "valid" : "hide"
                }
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={
                  validPasswordMatch || !matchPassword ? "hide" : "invalid"
                }
              />
            </label>
            <input
              type="password"
              id="confirm_pwd"
              onChange={(e) => setMatchPassword(e.target.value)}
              value={matchPassword}
              required
              aria-invalid={validPasswordMatch ? "false" : "true"}
              aria-describedby="confirmnote"
              onFocus={() => setPasswordFocusMatch(true)}
              onBlur={() => setPasswordFocusMatch(false)}
            />
            <p
              id="confirmnote"
              className={
                passwordFocusMatch && !validPasswordMatch
                  ? "instructions"
                  : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Must match the first password input field.
            </p>

            {/* SUBMIT BUTTON */}
            <button
              disabled={!validPassword || !validPasswordMatch || !validName}
            >
              Cadastrar
            </button>
          </form>
        </section>
      )}
    </>
  );
};
export default Register;
