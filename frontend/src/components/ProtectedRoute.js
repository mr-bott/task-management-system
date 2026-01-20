import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");  // http cookeis is recomanded in production 
  //verifying toekne is there are not
  if (!token) return <Navigate to="/login" />;
  if (role && role !== userRole) return <Navigate to="/" />; //no token , protecting routes
  // goto children routes
  return children;
}
