// src/components/Services.js
import React, { useEffect, useState, useRef } from "react";
import "./services.css";

import Button from "@mui/material/Button";

import ServiceItem from "../../../Components/serviceItem/ServiceItem";
// import ServiceCard from "../../components/serviceCard/Card";
import services from "../../../mocks/services";
// import wppImg from "../../../img/WhatsApp-removebg-preview-removebg-preview.png";

import { useSelector } from "react-redux";
import { themeColors } from "../../../themes/styles";

const Services = () => {
  const [isVisible, setIsVisible] = useState({});
  const themeMode = useSelector((state) => state.theme.mode);

  const handleScroll = () => {
    const list = document.querySelector(".service-list");
    const itens = document.querySelectorAll(".service-list-item");

    if (list && itens) {
      itens.forEach((item) => {
        const id = item.id;
        const listRect = list.getBoundingClientRect();
        const liRect = item.getBoundingClientRect();
        if (liRect.top >= listRect.top && liRect.bottom <= listRect.bottom) {
          setIsVisible((prevState) => ({
            ...prevState,
            [id]: true,
          }));
        } else {
          setIsVisible((prevState) => ({
            ...prevState,
            [id]: false,
          }));
        }
      });
    }
  };
  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div
      className="services"
      style={{
        backgroundColor: themeColors[themeMode].backgroundColor,
        color: themeColors[themeMode].textColor,
      }}
    >
      <h1
        id="title-services"
        style={{
          backgroundColor: themeColors[themeMode].backgroundColor,
          color: themeColors[themeMode].textColor,
        }}
      >
        Serviços
      </h1>
      {/* <p>Esses são alguns dos serviços que fazemos.</p> */}
      <ul className="service-list">
        {services.map((service, index) => {
          return (
            <li
              id={index}
              key={index}
              className={`service-list-item${
                isVisible[index] ? "-visible" : ""
              }`}
            >
              <ServiceItem serviceItem={service} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Services;
