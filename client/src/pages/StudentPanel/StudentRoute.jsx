import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Footer from "../../components/Footer";

//! bu korumalı route sayesinde öğretmenler öğrencilerin özel sayfalarına giremeyecekler
const StudentRoute = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return <Navigate to={"/"} replace />;

  if (!user.isStudent) {
    return <Navigate to={"/"} replace />;
  } else {
    return (
      <div className="flex flex-col gap-5 min-h-screen">
        <div className="flex flex-1">
          <Sidebar />
          <div className="flex-1">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
};

export default StudentRoute;
