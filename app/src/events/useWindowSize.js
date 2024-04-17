import { useState, useEffect } from "react";
export const useWindowSize = () => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    heigth: window.innerHeight,
  });
  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        heigth: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.addEventListener("resize", handleResize);
    };
  }, []);
  return size;
};
