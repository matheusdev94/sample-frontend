import React, { useEffect } from "react";
import axios from "../api/axios";

const Logout = () => {
  useEffect(() => {
    axios.get("/logout");
  });
};

export default Logout;
