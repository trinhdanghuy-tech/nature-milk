import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../utils/auth";

export default function RequireAuth({ children }: { children: any }) {
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
