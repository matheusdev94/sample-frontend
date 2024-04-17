import React, { useEffect, useState } from "react";

import { BottomMarginButton } from "../../../Components/button/bottomMarginButton";
import ContactForm from "../../../Components/contactForm/ContactForm";
import { Modal } from "../../../Components/modal";

import { useSelector } from "react-redux";
import { themeColors } from "../../../themes/styles";
import { FcAssistant } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";

import "./contact.css";

const Contact = () => {
  const themeMode = useSelector((state) => state.theme.mode);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const history = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const [user, setUser] = useState({});

  // useEffect(() => {
  //   if (success) {
  //     setIsLoading(true); // Start loading state
  //     setTimeout(() => {
  //       setIsLoading(false); // Stop loading state after 4 seconds
  //     }, 2500);
  //   }
  // }, [success]);

  const createOrderLink = (orederList) => {
    let orderText = `Olá, me chamo ${user.name}, quero um orçamento dos seguintes itens: `;
    let orderItems = " ";
    orederList.forEach((element) => {
      if (orederList.indexOf(element) === orederList.length - 1) {
        orderItems = orderItems + element.name + ".";
      } else {
        orderItems = orderItems + element.name + ", ";
      }
    });
    orderText =
      orderText + orderItems.substring(0, orderItems.length - 1) + ".";

    const link =
      process.env.REACT_APP_WHATSAPP_LINK +
      `?text=${orderText.replace(/ /g, "%20")}`;
    // window.open(link, "_blank");

    return cartItems.length > 0 ? link : process.env.REACT_APP_WHATSAPP_LINK;
  };

  return (
    <>
      <div
        className="main-contact"
        style={{
          backgroundColor: themeColors[themeMode].backgroundColor,
          color: themeColors[themeMode].textColor,
        }}
      >
        <h1>Contato</h1>
        <ContactForm
          setError={setError}
          setLoading={setIsLoading}
          setUser={setUser}
          setSuccess={setSuccess}
        />
      </div>

      {success && (
        <Modal closeModal={setSuccess} hideButton={true}>
          <section className="success-register">
            {isLoading ? (
              <ReactLoading
                type={"spin"}
                color={"#ffffff"}
                height={"50px"}
                width={"50px"}
              />
            ) : (
              <>
                <h2>Tudo certinho...</h2>
                <p>Recebemos seus dados e em breve vamos entrar em contato.</p>
                <br />
                <p>Porém, posso te direcionar para uma conversa no Whatsapp.</p>
                <p>Podemos?</p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    margin: "5px",
                    marginTop: "20px",
                  }}
                >
                  <BottomMarginButton
                    action={() => {
                      window.open(createOrderLink(cartItems), "_blank");
                      history("/");
                    }}
                    text={"Sim."}
                  />
                  <BottomMarginButton
                    action={() => history("/")}
                    text={"Não, ir à Home Page."}
                  ></BottomMarginButton>
                </div>
              </>
            )}
          </section>
        </Modal>
      )}
      {error && (
        <Modal closeModal={setSuccess} hideButton={true}>
          <section className="success-register">
            {isLoading ? (
              <ReactLoading
                type={"spin"}
                color={"#ffffff"}
                height={"50px"}
                width={"50px"}
              />
            ) : (
              <>
                <h2>Ops!</h2>
                <p>
                  Houve um erro ao enviar seus dados, gostaria de tentar
                  novamente ou ir a uma conversa direta por WhatsApp?.
                </p>
                <br />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    margin: "5px",
                    marginTop: "20px",
                  }}
                >
                  <BottomMarginButton
                    action={() => {
                      window.open(createOrderLink(cartItems), "_blank");
                      history("/");
                    }}
                    text={"Inicial conversa no Whastapp."}
                  />
                  <BottomMarginButton
                    action={() => setError(false)}
                    text={"Tentar novamente."}
                  ></BottomMarginButton>
                </div>
              </>
            )}
          </section>
        </Modal>
      )}
    </>
  );
};

export default Contact;
