import React from "react";

import { changeLanguage } from "../../store/slices/languageSlice";
import { useDispatch, useSelector } from "react-redux";
import { languages } from "../../strings/strings";

import "./SelectLanguage.css";

const SelectLanguage = () => {
  const language = useSelector((state) => state.language.language);
  const dispatch = useDispatch();

  const handleChangeLanguage = (selectedLanguage) => {
    if (
      typeof selectedLanguage.toLowerCase() === "string" &&
      selectedLanguage.length === 2
    ) {
      dispatch(changeLanguage(selectedLanguage));
    }
  };

  return (
    <div className="select-languges-wrapper">
      <label htmlFor="select-languages">
        {languages[language].labelLanguage}
      </label>
      <select
        name="languages"
        id="select-languages"
        onChange={(e) => handleChangeLanguage(e.target.value)}
      >
        <option value="pt" selected={language === "pt"}>
          pt
        </option>
        <option value="en" selected={language === "en"}>
          en
        </option>
        <option value="it" selected={language === "it"}>
          it
        </option>
        <option value="es" selected={language === "es"}>
          es
        </option>
        <option value="fr" selected={language === "fr"}>
          fr
        </option>
      </select>
    </div>
  );
};

export default SelectLanguage;
