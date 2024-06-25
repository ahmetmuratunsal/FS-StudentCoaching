import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PrivateLesson from "./pages/PrivateLesson";
import PrivateLessonDetail from "./pages/PrivateLessonDetail";
import AddPrivateLesson from "./pages/AddPrivateLesson";
import MyPrivateLesson from "./pages/MyPrivateLesson";
import TeacherRoute from "./pages/TeacherRoute";
import StudentRoute from "./pages/StudentPanel/StudentRoute";
import StudentPanel from "./pages/StudentPanel/StudentPanel";
import Questions from "./pages/StudentPanel/Questions";
import AddQuestion from "./pages/StudentPanel/AddQuestion";
import Layout from "./Layout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Özel ders routeları */}
          <Route path="/search/privatelesson" element={<PrivateLesson />} />
          <Route path="/privatelesson/:id" element={<PrivateLessonDetail />} />

          {/* korumalı route oluşturdum. Sadece öğretmenler girebilecek */}
          <Route element={<TeacherRoute />}>
            <Route path="/add-privatelesson" element={<AddPrivateLesson />} />

            <Route path="/my-privatelesson" element={<MyPrivateLesson />} />
          </Route>
        </Route>
        {/* korumalı route oluşturdum. Sadece ÖĞRENCİLER girebilecek */}
        <Route element={<StudentRoute />}>
          <Route path="/studentpanel" element={<StudentPanel />} />
          <Route path="/questions" element={<Questions />} />
          <Route path="/addquestion" element={<AddQuestion />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
