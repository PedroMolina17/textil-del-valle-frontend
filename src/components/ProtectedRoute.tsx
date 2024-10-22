import { Navigate } from "react-router-dom";
import Cookie from "js-cookie";

const ProtectedRoute = ({ children }) => {
  const token = Cookie.get("token");

  if (!token) {
    return <Navigate to="/" />;
  }

  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  const roleId = decodedToken.roleId;

  if (roleId === 1) {
    return children;
  } else if (roleId === 2) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
};

export default ProtectedRoute;
