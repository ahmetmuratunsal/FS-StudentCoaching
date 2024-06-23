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
import ProtectedRoute from "./pages/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-1 max-w-[1440px] mx-auto p-5 w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/search/privatelesson" element={<PrivateLesson />} />

            {/* korumalı route oluşturdum. Sadece öğretmenler girebilecek */}
            <Route element={<ProtectedRoute />}>
              <Route path="/add-privatelesson" element={<AddPrivateLesson />} />

              <Route path="/my-privatelesson" element={<MyPrivateLesson />} />
            </Route>
            <Route
              path="/privatelesson/:id"
              element={<PrivateLessonDetail />}
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
