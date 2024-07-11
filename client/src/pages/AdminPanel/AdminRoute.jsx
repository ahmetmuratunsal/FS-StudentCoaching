import { Navigate, Outlet } from "react-router-dom";
import Footer from "../../components/Footer";
import AdminSidebar from "./AdminSidebar";

//! bu korumalı route sayesinde öğretmenler öğrencilerin özel sayfalarına giremeyecekler
const AdminRoute = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return <Navigate to={"/"} replace />;

  if (!user.isAdmin) {
    return <Navigate to={"/"} replace />;
  } else if (user.isActive === false) {
    return <Navigate to={"/activation"} replace />;
  } else {
    return (
      <div className="flex flex-1 ">
        <AdminSidebar />
        <div className="flex flex-col gap-5 w-full h-min-screen">
          <div className="flex-1 p-14">
            <Outlet />
          </div>
          <div>
            <Footer />
          </div>
        </div>
      </div>
    );
  }
};

export default AdminRoute;
