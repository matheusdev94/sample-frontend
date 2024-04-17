import React, { useState } from "react";
import { MdLightMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";

import "./Theme.css";
import { useTheme, themeColors } from "../../themes/styles";
import { toogleTheme } from "../../store/slices/themeSlice";
import { useDispatch, useSelector } from "react-redux";

const Theme = () => {
  const [selectedModeLigth, setSelectedModeLight] = useState(false);
  const dispatch = useDispatch();
  const themeMode = useSelector((state) => state.theme.mode);

  const handleSelectMode = () => {
    setSelectedModeLight(!selectedModeLigth);
    dispatch(toogleTheme());
  };

  return (
    <section className="colormode-section">
      <button
        className="colormode-button"
        style={{
          backgroundColor: themeColors[themeMode].backgroundColor,
          color: themeColors[themeMode].primary,
        }}
        onClick={() => handleSelectMode()}
      >
        {selectedModeLigth ? (
          <>
            <p style={{ color: themeColors[themeMode].textColor }}>
              <MdLightMode
                className="colormode-icon"
                style={{ color: themeColors[themeMode].textColor }}
              />
              Claro
            </p>
          </>
        ) : (
          <>
            <p tyle={{ color: themeColors[themeMode].textColor }}>
              <MdDarkMode
                className="colormode-icon"
                style={{ color: themeColors[themeMode].textColor }}
              />
              Escuro
            </p>
          </>
        )}
      </button>
    </section>
  );
};

export default Theme;
