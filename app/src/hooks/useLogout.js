import useAuth from "./useAuth";
import axios from "../api/axios";

export const useLogout = () => {
  const { setAuth } = useAuth();
  const logout = async () => {
    setAuth({});
    try {
      const response = await axios.get("/logout", { withCredentials: true });
    } catch (e) {
      console.error(e);
    }
  };
  return logout;
};
export default useLogout;
