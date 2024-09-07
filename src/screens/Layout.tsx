import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";

import { useAuth } from "../AuthProvider";

export const Layout = () => {
  const auth = useAuth();
  const session = auth!.session;
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    auth?.getSession().then(() => {
      setIsLoading(false);
    });
  }, [session]);

  if (isLoading) {
    return <div className="w-screen h-screen flex items-center justify-center">Loading ... </div>;
  }

  return (
    <div className="w-screen h-screen flex flex-col justify-between">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};
