import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputMask from "react-input-mask";
import Textarea from "@mui/joy/Textarea";

import axios from "../../api/axios";

import "@fortawesome/fontawesome-free/css/all.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import "./ContactForm.css";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { themeColors } from "../../themes/styles";
import { TextareaAutosize } from "@mui/material";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const ContactFormHome = ({ setSuccess, setUser, setLoading, setError }) => {
  const [name, setName] = useState("");
  const [validName, setValidName] = useState(true); // Initialize to true
  const [phone, setPhone] = useState("");
  const [validPhone, setValidPhone] = useState(true); // Initialize to true
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(true); // Initialize to true
  const [errMsg, setErrMsg] = useState("");
  const [honey, setHoney] = useState("");
  const [msg, setMsg] = useState("");

  const [submitted, setSubmitted] = useState(false);

  const [fullname, setFullName] = useState();
  const themeMode = useSelector((state) => state.theme.mode);

  const sendForm = async (username, phone, email, message) => {
    // Construa um objeto de dados com os parâmetros recebidos
    const csrf = await getCsrf();
    console.log(csrf);
    if (!csrf) return;
    // Defina os headers com o token CSRF
    const headers = {
      headers: {
        anticsrf: csrf,
      },
    };
    console.log("headers: ", headers);

    const data = {
      username: username,
      phone: phone,
      email: email,
      message: message,
    };

    try {
      const response = await axios.post("/registerContact", data, headers);

      console.log("Dados enviados com sucesso:", response.data);
      setSuccess(true);
      setName("");
      setEmail("");
      setPhone("");
      setMsg("");
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      setError(true);
    }
    setLoading(false);
  };
  const getCsrf = async () => {
    return await axios
      .get("/form")
      .then((res) => {
        console.log("csrf: ", res.data.formToken);
        return res.data.formToken;
      })
      .catch((error) => {
        // Manipule o erro aqui, se necessário
        console.error("Erro ao enviar dados:", error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (honey) {
      return;
    }
    //honeyPot
    if (fullname) {
      return;
    }
    if (name.length <= 0 || phone.length <= 0 || email.length <= 0) {
      setErrMsg("Por favor, verifique seus dados.");
      return;
    }

    if (name.length > 50 || phone.length > 50 || email.length > 50) {
      setErrMsg("Por favor, verifique seus dados.");
      return;
    }

    if (!validName || !validPhone || !validEmail) {
      setErrMsg("Por favor, verifique seus dados.");
      return;
    }

    setLoading(true);
    setUser({ name: name, email: email, phone: phone });
    sendForm(name, email, phone, msg);

    // setSuccess(true);
    setSubmitted(false);
  };
  useEffect(() => {
    if (submitted) {
      setValidPhone(phone);
      setValidName(name);
      setValidEmail(EMAIL_REGEX.test(email));
    }
  }, [email, phone, name]);
  const handleSetMsg = (value) => {
    if (msg.length <= 300 && value.length <= 300) {
      setMsg(value);
    } else {
      return;
    }
  };
  return (
    <section
      className="client-area"
      style={{
        backgroundColor: themeColors[themeMode].backgroundColor,
        color: themeColors[themeMode].textColor,
      }}
    >
      <h2 className="section-title">Área do cliente</h2>
      <p>Informe seus dados que entraremos em contato.</p>
      {errMsg && <p className="errMsg">{errMsg}</p>}
      <form className="contact-form" onSubmit={handleSubmit}>
        <Box className="input-area" component="div">
          <div className="inputs-contact-home">
            <div className="division-contact-home">
              <input
                className="baby"
                onChange={(e) => setHoney(e.target.value)}
                value={honey}
              ></input>

              <TextField
                id="fullname"
                autoComplete="off"
                className="contact-input"
                label="FullName"
                variant="standard"
                value={fullname}
                style={{ visibility: "hidden", position: "absolute" }}
                onChange={(e) => {
                  setFullName(e.target.value);
                }}
                InputLabelProps={{
                  style: { color: themeColors[themeMode].textColor }, // Cor do rótulo
                }}
                inputProps={{
                  maxLength: 50,
                }}
                InputProps={{
                  style: { color: themeColors[themeMode].textColor },
                }}
              />
              <TextField
                id="username"
                className="contact-input"
                autoComplete="off"
                label="Nome"
                variant="standard"
                value={name}
                required
                error={!validName}
                helperText={!validName ? "O nome fornecido não é válido." : ""}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                InputLabelProps={{
                  style: { color: themeColors[themeMode].textColor },
                }}
                inputProps={{
                  maxLength: 50,
                }}
                InputProps={{
                  style: { color: themeColors[themeMode].textColor },
                }}
              />
              <InputMask
                id="phone"
                mask="(99) 99999-9999"
                maskChar="_"
                autoComplete="off"
                className="contact-input"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              >
                {() => (
                  <TextField
                    id="telefone"
                    label="Telefone"
                    autoComplete="off"
                    className="contact-input"
                    variant="standard"
                    required
                    error={!validPhone}
                    helperText={
                      !validPhone ? "O telefone fornecido não é válido." : ""
                    }
                    InputLabelProps={{
                      style: { color: themeColors[themeMode].textColor },
                    }}
                    inputProps={{
                      maxLength: 50,
                    }}
                    InputProps={{
                      style: { color: themeColors[themeMode].textColor },
                    }}
                  />
                )}
              </InputMask>
              <TextField
                id="email"
                label="Email"
                className="contact-input"
                variant="standard"
                type="email"
                value={email}
                required
                error={!validEmail}
                helperText={!validEmail ? "Esse email não é válido." : ""}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                InputLabelProps={{
                  style: { color: themeColors[themeMode].textColor },
                }}
                inputProps={{
                  maxLength: 50,
                }}
                InputProps={{
                  style: { color: themeColors[themeMode].textColor },
                }}
              />
            </div>

            <Textarea
              style={{
                backgroundColor: themeColors[themeMode].backgroundColorTextArea,
                // fontWeight: "bold", // Adicionando negrito
                color: themeColors[themeMode].textColor, // Alterei de textColor para color
                borderRadius: "0",
              }}
              className="text-area-contact"
              minRows={6}
              maxRows={6}
              name="Primary"
              value={msg}
              onChange={(e) => handleSetMsg(e.target.value)}
              maxLength={300}
              placeholder="Sua mensagem vai aqui..."
              // variant="outlined"
              variant="standard"
              autoComplete="off"
              // color="primary"
            ></Textarea>
          </div>
        </Box>

        <Button
          variant="outlined"
          id="home-contact-btn"
          disabled={!validName || !validPhone || !validEmail}
          onClick={(e) => handleSubmit(e)}
        >
          Enviar
        </Button>
      </form>
      <br />
      <br />
    </section>
  );
};

export default ContactFormHome;
