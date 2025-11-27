import { Outlet } from "react-router";
import { Toaster } from "react-hot-toast";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useEffect } from "react";
import Aos from "aos";
import Lenis from "@studio-freight/lenis";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MainLayout = () => {
  useEffect(() => {
    // AOS Init
    Aos.init();

    // Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.1,
      smooth: true,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <div>
      <div className="max-w-7xl mx-auto flex flex-col min-h-svh">
        <Header />
        <div className="mt-4 flex-1">
          <Outlet />
        </div>
        <Footer />
      </div>

      <Toaster />
    </div>
  );
};

export default MainLayout;
