import { useState, useEffect } from "react";
const useLocalStorage = (key, initValue) => {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    alert(storedValue);
    return storedValue ? JSON.parse(storedValue) : initValue;
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
};
export default useLocalStorage;