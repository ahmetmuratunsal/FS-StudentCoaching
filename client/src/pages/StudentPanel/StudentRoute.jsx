import { Navigate, Outlet } from "react-router-dom";
import StudentSidebar from "./StudentSidebar";
import Footer from "../../components/Footer";

//! bu korumalı route sayesinde öğretmenler öğrencilerin özel sayfalarına giremeyecekler
const StudentRoute = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return <Navigate to={"/"} replace />;

  if (!user.isStudent) {
    return <Navigate to={"/"} replace />;
  } else if (user.isActive === false) {
    return <Navigate to={"/activation"} replace />;
  } else {
    return (
      <div className="flex flex-1 ">
        <StudentSidebar />
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

export default StudentRoute;
