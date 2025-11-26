import { Outlet } from "react-router";

import { Toaster } from "react-hot-toast";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useEffect } from "react";
import Aos from "aos";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MainLayout = () => {
  useEffect(() => {
  Aos.init();
}, []);

  return (
    <div>
      <div className="max-w-7xl mx-auto flex flex-col min-h-screen">
        <Header/>
        <div className="mt-4 flex-1">
          <Outlet />
        </div>
        <Footer/>
      </div>

      <Toaster/>
    </div>
  );
};

export default MainLayout;
