import useLocalStorage from "./useLocalStorage";

const useToggle = (key, initValue) => {
  const [value, setValue] = useLocalStorage(key, initValue);
  const toggle = () => {
    setValue((prev) => {
      return !prev;
    });
  };
  return [value, toggle];
};

export default useToggle;
