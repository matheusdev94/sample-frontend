// src/components/Home.js
import React, { useEffect, useState } from "react";

import ContactFormHome from "../../../Components/contactFormHome/ContactForm";
import News from "../../../Components/news/News";
import { BottomMarginButton } from "../../../Components/button/bottomMarginButton";
import { Modal } from "../../../Components/modal";

import { themeColors } from "../../../themes/styles";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import ReactLoading from "react-loading";

import logoDark from "../../../img/logo/logo-dark.png";
import logoLight from "../../../img/logo/logo.png";

import "./home.css";

const HomePage = () => {
  const [indexPHighlights, setIndexPHighlights] = useState(0);
  const pHighlight = document.getElementsByClassName("company-description-out");
  const themeMode = useSelector((state) => state.theme.mode);

  const cartItems = useSelector((state) => state.cart.items);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [user, setUser] = useState({});
  const history = useNavigate();

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

  useEffect(() => {
    showElements();
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndexPHighlights((indexPHighlights) => indexPHighlights + 1);
      showElements();
    }, 30000);
    if (indexPHighlights >= pHighlight.length) {
      setIndexPHighlights(0);
    }
    return () => clearInterval(interval);
  });
  const showElements = () => {
    for (var i = 0; i < pHighlight.length; i++) {
      pHighlight[i].style.visibility = "hidden";
    }
    let currentPTag = document.getElementById(
      `company-description-${indexPHighlights}`
    );
    currentPTag.style.visibility = "visible";
  };

  return (
    <div
      className="main-home"
      style={{
        backgroundColor: themeColors[themeMode].backgroundColor,
        color: themeColors[themeMode].textColor,
      }}
    >
      <News />

      <section className="home-header">
        {/* <h1 className="home-title">Santa Branca Acabamentos</h1> */}

        <div className="logo-container">
          <img
            className="home-logo"
            src={themeMode === "light" ? logoLight : logoDark}
            style={{
              backgroundColor:
                themeMode === "light"
                  ? themeColors["dark"].backgroundColor
                  : themeColors["light"].backgroundColor,
            }}
            alt="home-logo"
          />
        </div>

        <section className="header-highlights">
          <div className="headlight">
            <p id="company-description" className="company-description">
              Atuando no mercado de decorações há mais de 15 anos, temos orgulho
              da nossa história fazendo dos nossos clientes o nosso maior
              patrimônio.
            </p>
          </div>
          <div className="sales-highlight" style={{ color: "white" }}>
            <p id="company-description-0" className="company-description-out">
              Sinta a diferença do acabamento impecável proporcionado pelo nosso
              serviço de gessos. Crie ambientes sofisticados e modernos que
              refletem seu estilo e personalidade, utilizando técnicas
              inovadoras e criar uma sanca de gesso elegante.
            </p>
            <p id="company-description-1" className="company-description-out">
              Transforme seus espaços com o toque artesanal do gesso! Descubra a
              elegância e versatilidade que nosso serviço de gessos proporciona,
              seja com uma parede 3D em gesso ou uma iluminação indireta
              deslumbrante para o teto da sala, na cozinha ou no seu banheiro.
            </p>
            <p id="company-description-2" className="company-description-out">
              Descubra a beleza e a durabilidade do gesso em seus projetos.
              Nossa equipe comprometida está pronta para superar suas
              expectativas e transformar suas ideias em realidade, seja com uma
              sanca de gesso que adiciona charme ao ambiente ou uma iluminação
              para gesso que cria atmosferas acolhedoras e sofisticadas.
            </p>
            <p id="company-description-3" className="company-description-out">
              Dê vida aos seus projetos com o toque refinado do gesso. Conte com
              nossa experiência para criar espaços únicos e memoráveis, seja com
              um guarda-roupa de gesso personalizado ou uma parede de gesso que
              transforma completamente o ambiente.
            </p>
          </div>
        </section>
        {/* <section>
          <h2>Diferenciais de Mercado</h2>
          <h3>Artesanato de Excelência</h3>
          <p>
            Nossos artesãos especializados garantem um acabamento impecável em
            cada detalhe, seja para um guarda-roupa de gesso personalizado ou
            uma parede 3D em gesso que impressiona pela sua precisão.
          </p>

          <h3>Variedade de Designs</h3>
          <p>
            Explore uma ampla seleção de designs exclusivos, desde placas de
            gesso texturizadas para criar uma parede 3D até sancas de gesso
            elegantes que adicionam um toque de sofisticação ao seu espaço.
          </p>

          <h3>Compromisso com a qualidade</h3>
          <p>
            Utilizamos apenas os melhores materiais e técnicas de instalação
            avançadas para garantir a durabilidade e a estética de cada projeto,
            seja para uma iluminação para gesso que destaca seus ambientes ou
            uma parede de gesso que transforma completamente o espaço.
          </p>

          <h3>Atendimento Personalizado</h3>
          <p>
            Nossa equipe altamente capacitada oferece um serviço personalizado
            desde a concepção até a conclusão do projeto, garantindo que suas
            necessidades sejam atendidas, seja para instalar um guarda-roupa de
            gesso sob medida ou criar uma sanca de gesso que se adapte
            perfeitamente ao seu estilo.
          </p>
        </section>*/}
      </section>
      <div>
        <ContactFormHome
          setError={setError}
          setLoading={setIsLoading}
          setUser={setUser}
          setSuccess={setSuccess}
        />
        {isLoading && (
          <Modal closeModal={setSuccess} hideButton={true}>
            <section className="success-register">
              <ReactLoading
                type={"spin"}
                color={"#ffffff"}
                height={"50px"}
                width={"50px"}
              />
            </section>
          </Modal>
        )}
        {success && (
          <Modal closeModal={setSuccess} hideButton={true}>
            <section className="success-register">
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
                    action={() => setSuccess(false)}
                    // action={() => history("/")}
                    text={"Não."}
                  ></BottomMarginButton>
                </div>
              </>
            </section>
          </Modal>
        )}
        {error && (
          <Modal closeModal={setSuccess} hideButton={true}>
            <section className="success-register">
              <h2>Ops!</h2>
              <p>
                Houve um erro ao enviar seus dados, gostaria de tentar novamente
                ou ir a uma conversa direta por WhatsApp?.
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
            </section>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default HomePage;
