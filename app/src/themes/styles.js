import { useSelector } from "react-redux";
export const useTheme = () => {
  return useSelector((state) => state.theme.mode);
};
export const themeColors = {
  dark: {
    primary: "#007fff",
    secondary: "#102132",
    backgroundColor: "#282c34",
    textColor: "rgb(210, 209, 209)",
    backgroundSearchInput: "#ffffff",
    backgroundSecondaryColor: "",
    shadowColor: "#fff",
    backgroundButon: "#fff",
    buttonTextColor: "#000",
    cartBg: "rgb(50, 50, 50)",
    cartBorder: "gray",
    cartTextColor: "#fff",
    backgroundItem: "rgba(63, 58, 58, 0.9)",
    backgroundColorTextArea: "rgb(37, 40, 48)",
  },
  light: {
    primary: "#007fff",
    secondary: "#102132",
    backgroundColor: "rgba(231, 230, 230)",
    textColor: "rgb(60, 60, 60)",
    backgroundSecondaryColor: "",
    backgroundSearchInput: "lightgray",
    shadowColor: "#000",
    buttonTextColor: "#fff",
    backgroundButon: "#000",
    cartBorder: "#fff",
    cartBg: "#282C34",
    cartTextColor: "#fff",
    backgroundItem: "rgba(231, 230, 230, 0.9)",
    backgroundColorTextArea: "rgb(204 205 230)",
  },
};
