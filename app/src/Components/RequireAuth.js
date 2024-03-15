import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import Loading from "../routes/Loading";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  const [loading, setLoading] = useState(true);

  const refreshToken = useRefreshToken();

  useEffect(() => {
    const fetchUserData = async () => {
      await refreshToken().then(() => {
        setLoading(false);
      });
    };
    fetchUserData();
  }, []);

  return loading ? (
    <Loading />
  ) : auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : auth?.accessToken ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
