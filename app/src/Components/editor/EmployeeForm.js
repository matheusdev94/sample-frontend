import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import React, { useRef, useEffect, useState } from "react";
// import axios from "../../api/axios";
import useRefreshToken from "../../hooks/useRefreshToken";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";

import "./EmployeeForm.css";

const EmployeeForm = () => {
  const [loading, setLoading] = useState(true);
  const refresh = useRefreshToken();

  const navigate = useNavigate();

  const [success, setSuccess] = useState(false);

  return (
    <section className="employee-form-wraper">
      {success ? <p>Register created.</p> : <Form setSuccess={setSuccess} />}
    </section>
  );
};

const NAME_REGEX = /^[A-z][A-z]{3,23}$/;
const Form = ({ antiCsfr, setSuccess }) => {
  const errRef = useRef();
  const userRef = useRef();

  const [validFirstName, setValidFirstName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [firstNameFocus, setFirstNameFocus] = useState(false);

  const [validSecondName, setValidSecondName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [secondNameFocus, setSecondNameFocus] = useState(false);

  const [errMsg, setErrMsg] = useState(null);

  const [loading, setLoading] = useState(false);

  const refresh = useRefreshToken();
  const axios = useAxiosPrivate();
  const [antiCsrf, setCsrf] = useState(null);

  const getToken = async () => {
    await refresh().then(async () => {
      await axios
        .get("/form", { withCredentials: true })
        .then((res) => {
          setCsrf(res?.data?.formToken);
        })
        .catch((e) => console.error(e))
        .finally((e) => {
          setLoading(false);
        });
    });
  };
  useEffect(() => {
    getToken();
  }, []);
  const handleSubmit = async (e) => {
    setLoading(true);

    e.preventDefault();
    const v1 = NAME_REGEX.test(firstName);
    const v2 = NAME_REGEX.test(secondName);

    if (!validFirstName || !validSecondName || !v1 || !v2) {
      setErrMsg("Error on the submit form.");
      return;
    }
    try {
      await refresh().then(() => {
        axios
          .post(
            "/employees",
            JSON.stringify({
              firstname: firstName,
              lastname: secondName,
            }),
            {
              headers: {
                "Content-Type": "application/json",
                anticsrf: antiCsrf,
              },
              withCredentials: true,
            }
          )
          .then((r) => {
            if (r.status === 201) {
              setSuccess(true);
            } else {
              setErrMsg(r.status);
            }
          })
          .catch((e) => {
            setErrMsg(e.message);
            console.error(e.message);
          })
          .finally(() => {
            setLoading(false);
          });
      });
    } catch (e) {
      console.error("err on sumbit new employee: ", e.message);
      setErrMsg("erro:", e);
      setErrMsg(e.message);
    }
  };

  useEffect(() => {
    setValidFirstName(NAME_REGEX.test(firstName));
    setValidSecondName(NAME_REGEX.test(secondName));
  }, [firstName, secondName]);

  const [showButton, setShowButton] = useState(false);
  useEffect(() => {
    let timer;
    if (showButton) {
      timer = setTimeout(() => {
        if (validFirstName && validSecondName) {
          setShowButton(true);
        } else {
          setShowButton(false);
        }
      }, 400);
    } else {
      if (validFirstName && validSecondName) setShowButton(true);
    }

    return () => clearTimeout(timer);
  }, [validFirstName, validSecondName]);

  // useEffect(() => {
  //   alert(showButton);
  // }, [showButton]);
  return (
    <form className="form" onSubmit={handleSubmit}>
      <inpu className="antiCsrf-input" value={antiCsfr} />
      <div className="inputs-wrapper">
        {loading && <p>Loading...</p>}
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <p>Enter the eployees informations:</p>
        {/* FIRSTNAME */}
        <div className="input-container">
          <label htmlFor="firstName">
            Fist Name:
            <FontAwesomeIcon
              icon={faCheck}
              className={validFirstName ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validFirstName || !firstName ? "hide" : "invalid"}
            />
          </label>
          <input
            className="text-input"
            type="text"
            id="firstName"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setFirstName(e.target.value)}
            required
            aria-invalid={validFirstName ? "false" : "true"}
            aria-describedby="uidnote"
            onFocus={() => setFirstNameFocus(true)}
            onBlur={() => setFirstNameFocus(false)}
            maxLength={50}
          />
          <p
            id="uidnote"
            className={
              firstNameFocus && firstName && !validFirstName
                ? "instructions"
                : "offscreen"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            Must begin leters only and have more than 3 letters.
          </p>
        </div>
        {/* SECONDNAME */}
        <div className="input-container">
          <label htmlFor="secondName">
            Last Name:
            <FontAwesomeIcon
              icon={faCheck}
              className={validSecondName ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validSecondName || !secondName ? "hide" : "invalid"}
            />
          </label>
          <input
            className="text-input"
            type="text"
            id="firstName"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setSecondName(e.target.value)}
            required
            aria-invalid={validSecondName ? "false" : "true"}
            aria-describedby="uidnote"
            onFocus={() => setSecondNameFocus(true)}
            onBlur={() => setSecondNameFocus(false)}
            maxLength={50}
          />
          <p
            id="uidnote"
            className={
              secondNameFocus && secondName && !validSecondName
                ? "instructions"
                : "offscreen"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            Must begin leters only and have more than 3 letters.
          </p>
        </div>
      </div>
      {/* SUBMIT BUTTON */}
      <button
        className={showButton ? "register-button" : "register-button-hide"}
        disabled={!validFirstName || !validSecondName}
      >
        Register
      </button>
    </form>
  );
};

export default EmployeeForm;
