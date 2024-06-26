import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

const Layout = () => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <div className="flex-1 max-w-[1440px] mx-auto p-5 w-full">
      <Outlet />
    </div>
    <div className="mt-0 md:mt-80">
      <Footer />
    </div>
  </div>
);

export default Layout;
