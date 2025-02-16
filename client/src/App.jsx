import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateLesson from "./pages/PrivateLesson";
import PrivateLessonDetail from "./pages/PrivateLessonDetail";
import AddPrivateLesson from "./pages/TeacherPanel/AddPrivateLesson";
import MyPrivateLesson from "./pages/TeacherPanel/MyPrivateLesson";
import TeacherRoute from "./pages/TeacherPanel/TeacherRoute";
import StudentRoute from "./pages/StudentPanel/StudentRoute";
import StudentPanel from "./pages/StudentPanel/StudentPanel";
import AddQuestion from "./pages/StudentPanel/AddQuestion";
import Layout from "./Layout";
import TeacherPanel from "./pages/TeacherPanel/TeacherPanel";
import StudentQuestions from "./pages/StudentPanel/StudentQuestions";
import TeacherQuestions from "./pages/TeacherPanel/TeacherQuestions";
import QuestionDetail from "./pages/TeacherPanel/QuestionDetail";
import AdminRoute from "./pages/AdminPanel/AdminRoute";
import AdminPanel from "./pages/AdminPanel/AdminPanel";
import Users from "./pages/AdminPanel/Users";
import UserDetail from "./pages/AdminPanel/UserDetail";
import AdminQuestions from "./pages/AdminPanel/AdminQuestions";
import StudentMeetings from "./pages/StudentPanel/StudentMeetings";
import AddMeeting from "./pages/StudentPanel/AddMeeting";
import TeacherMeetings from "./pages/TeacherPanel/TeacherMeetings";
import AdminMeetings from "./pages/AdminPanel/AdminMeetings";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import ActivationPage from "./pages/ActivationPage";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* Özel ders routeları */}
          <Route path="/search/privatelesson" element={<PrivateLesson />} />
          <Route path="/privatelesson/:id" element={<PrivateLessonDetail />} />
        </Route>
        {/* korumalı route oluşturdum. Sadece ÖĞRETMENLER girebilecek */}
        <Route element={<TeacherRoute />}>
          <Route path="/teacherpanel" element={<TeacherPanel />} />
          <Route path="/add-privatelesson" element={<AddPrivateLesson />} />
          <Route path="/my-privatelesson" element={<MyPrivateLesson />} />
          <Route path="/teacherquestions" element={<TeacherQuestions />} />
          <Route path="/teacherquestion/:id" element={<QuestionDetail />} />
          <Route path="/teachermeetings" element={<TeacherMeetings />} />
        </Route>
        {/* korumalı route oluşturdum. Sadece ÖĞRENCİLER girebilecek */}
        <Route element={<StudentRoute />}>
          <Route path="/studentpanel" element={<StudentPanel />} />
          <Route path="/studentquestions" element={<StudentQuestions />} />
          <Route path="/add-question" element={<AddQuestion />} />
          <Route path="/studentmeetings" element={<StudentMeetings />} />
          <Route path="/add-meeting" element={<AddMeeting />} />
        </Route>

        {/* Korumalı route - ADMİNler için */}
        <Route element={<AdminRoute />}>
          <Route path="/adminpanel" element={<AdminPanel />} />
          <Route path="/adminquestions" element={<AdminQuestions />} />
          <Route path="/adminmeetings" element={<AdminMeetings />} />
          <Route path="/users" element={<Users />} />
        </Route>

        <Route path="/userdetail/:id" element={<UserDetail />} />
        <Route path="/activation" element={<ActivationPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
