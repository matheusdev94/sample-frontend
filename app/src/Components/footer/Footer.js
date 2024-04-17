import React, { useEffect } from "react";
import "./Footer.css";
import { useSelector } from "react-redux";
import { themeColors } from "../../themes/styles";
import location from "../../img/maps/location.png";
const Footer = () => {
  const themeMode = useSelector((state) => state.theme.mode);
  const handleScrollBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <footer
      className="footer"
      style={{
        backgroundColor: themeColors[themeMode].backgroundColor,
        color: themeColors[themeMode].textColor,
      }}
    >
      <div className="company-details">
        <div className="location-details">
          <p>
            Endereço:
            <br />
            <a
              href="https://www.google.com.br/maps/place/Rua+Dr.+%C3%81lvaro+Camargos,+1803+-+Santa+Branca,+Belo+Horizonte+-+MG,+31565-413/@-19.8288169,-43.9639149,19z/data=!3m1!4b1!4m6!3m5!1s0xa6902019b136d5:0x745c32ac096ce617!8m2!3d-19.8288182!4d-43.9632712!16s%2Fg%2F11jvdm5_8l?entry=ttu"
              target="_blank"
            >
              Rua Dr Álvaro Camargos, 1803, bairro Santa Branca, Belo Horizonte
            </a>
          </p>
          <p>Pamulha</p>
        </div>
        <hr />
        <div className="contact-details">
          <p>
            Telefone:
            <br />
            <a href={process.env.REACT_APP_WHATSAPP_LINK} target="_blank">
              {process.env.REACT_APP_WHATSAPP}
            </a>
          </p>
          <p>
            Email:
            <br />
            <a href={`mailto:${process.env.REACT_APP_EMAIL}`}>
              {process.env.REACT_APP_EMAIL}
            </a>
          </p>
        </div>
      </div>
      <div
        className="map"
        target="_blank"
        href="https://www.google.com.br/maps/place/Rua+Dr.+%C3%81lvaro+Camargos,+1803+-+Santa+Branca,+Belo+Horizonte+-+MG,+31565-413/@-19.8288169,-43.9639149,19z/data=!3m1!4b1!4m6!3m5!1s0xa6902019b136d5:0x745c32ac096ce617!8m2!3d-19.8288182!4d-43.9632712!16s%2Fg%2F11jvdm5_8l?entry=ttu"
        onMouseOver={() => handleScrollBottom}
      >
        {/* <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.871040358717!2d-122.14334968459124!3d37.44171817975987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808f7e127b123971%3A0x3f6a9ea60ab684c1!2sGolden%20Gate%20Bridge!5e0!3m2!1sen!2sus!4v1582908180211!5m2!1sen!2sus"
          width="600"
          height="450"
          frameborder="0"
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "10px",
          }}
          allowfullscreen=""
          aria-hidden="false"
          tabindex="0"
        ></iframe> */}
      </div>
      <p className="cpy">
        &copy; 2024 Santa Branca Acabamentos. Todos os direitos reservados.
      </p>
    </footer>
  );
};

export default Footer;
