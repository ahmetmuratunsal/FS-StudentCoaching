import { Navigate, Outlet } from "react-router-dom";
//! bu korumalı route sayesinde öğrenciler öğretmenlere özel sayfalara giremeyecekler
const TeacherRoute = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    if (user.isStudent) {
      return <Navigate to={"/"} replace />;
    } else {
      return <Outlet />;
    }
  } else {
    return <Navigate to={"/"} replace />;
  }
};

export default TeacherRoute;
