import React, { useEffect, useState } from "react";
import "./News.css";

import { themeColors } from "../../themes/styles";
import { useSelector } from "react-redux";

const phrases = [
  "Olá, seja bem vindo.",
  "Fique a vontade...",
  "Confira nossos preços e condições!",
  "Atendemos BH e região.",
  "💥 Com descontos imperdíveis para a região da Pampulha 💥",
];

const News = () => {
  const [phrasesIndex, setPhrasesIndex] = useState(0);
  const themeMode = useSelector((state) => state.theme.mode);

  const increaseIndex = () => {
    if (phrasesIndex >= phrases.length) {
      setPhrasesIndex(0);
    } else {
      setPhrasesIndex(phrasesIndex + 1);
    }
  };
  const decreaseIndex = () => {
    if (phrasesIndex <= 0) {
      setPhrasesIndex(phrases.length - 1);
    } else {
      setPhrasesIndex(phrasesIndex - 1);
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setPhrasesIndex((phrasesIndex) => phrasesIndex + 1);
    }, 10000);
    if (phrasesIndex >= phrases.length) {
      setPhrasesIndex(0);
    }
    return () => clearInterval(interval);
  });

  return (
    <section
      className="news-section"
      style={
        {
          // backgroundColor: themeColors[themeMode].backgroundColor,
          // color: themeColors[themeMode].textColor,
        }
      }
    >
      <button className="news-button" onClick={() => decreaseIndex()}>
        <p
          style={
            {
              // backgroundColor: themeColors[themeMode].backgroundColor,
              // color: themeColors[themeMode].textColor,
            }
          }
        >
          &lt;
        </p>
      </button>
      <div className="news">
        <p>{phrases[phrasesIndex]}</p>
      </div>
      <button className="news-button" onClick={() => increaseIndex()}>
        <p
          style={
            {
              // backgroundColor: themeColors[themeMode].backgroundColor,
              // color: themeColors[themeMode].textColor,
            }
          }
        >
          &gt;
        </p>
      </button>
    </section>
  );
};

export default News;
