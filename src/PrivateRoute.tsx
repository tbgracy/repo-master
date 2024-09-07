import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "./AuthProvider";

export default function PrivateRoute() {
  const auth = useAuth();
  if (!auth?.session) return <Navigate to="/" />;
  return <Outlet />;
}
