import { Outlet } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";

export const Layout = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-between">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};
