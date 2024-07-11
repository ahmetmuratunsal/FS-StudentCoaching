import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../utils/api";
import { toast } from "react-toastify";
import Input from "./../components/Input";

const Login = () => {
  const [isStudent, setIsStudent] = useState(true);
  const [isOpenResetPassword, setIsOpenResetPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const user = Object.fromEntries(formData.entries());
    user.isStudent = isStudent;
    user.username = user.username.toLowerCase();

    api
      .post("/auth/login", user)
      .then((res) => {
        if (res.data?.user?.isActive) {
          // bildirim gönder
          toast.success(res.data.message);
          // kullanıcı bilgilerini locale kaydet
          localStorage.setItem("user", JSON.stringify(res.data.user));
          // anasayfaya yönlendir
          navigate("/");
        }
        if (!res.data?.user?.isActive) {
          // kullanıcı bilgilerini locale kaydet
          localStorage.setItem("user", JSON.stringify(res.data.user));
          toast.error("Hesabınız aktif değil.");
          navigate("/activation");
        }
      })
      .catch((err) => {
        toast.error(err.response.data?.message);
        setIsOpenResetPassword(true);
      });
  };
  return (
    <div className="bg-[url('/banner3.jpg')] bg-cover bg-center bg-no-repeat  bg-fixed">
      <div className="h-screen flex justify-center items-center">
        <div className="bg-white mx-4 p-8 rounded shadow-md w-full md:w-1/2 lg:w-1/3">
          <h1 className="text-lg md:text-2xl tracking-wide font-bold mb-8 text-center">
            Hesabınıza Giriş Yapın
          </h1>
          <form onSubmit={handleSubmit}>
            <Input
              label="Kullanıcı Adı"
              name="username"
              placeholder="Kullanıcı adınızı giriniz"
            />
            <Input
              label="Şifre"
              name="password"
              placeholder="Şifrenizi giriniz"
              type="password"
            />

            {/* öğrenci misin alanı */}

            <div className="mt-5 flex space-x-2 border-[3px] border-purple-400 rounded-xl select-none">
              <label className="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer">
                <input
                  onChange={() => setIsStudent(true)}
                  type="radio"
                  name="isStudent"
                  value="true"
                  className="peer hidden"
                  checked={isStudent}
                />
                <span className="tracking-widest font-bold peer-checked:bg-gradient-to-r peer-checked:from-[blueviolet] peer-checked:to-[violet] peer-checked:text-white text-gray-700 p-2 rounded-lg transition duration-150 ease-in-out">
                  Öğrenci
                </span>
              </label>

              <label className="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer">
                <input
                  onChange={() => setIsStudent(false)}
                  type="radio"
                  name="isStudent"
                  value="false"
                  className="peer hidden"
                />
                <span className="tracking-widest font-bold peer-checked:bg-gradient-to-r peer-checked:from-[blueviolet] peer-checked:to-[violet] peer-checked:text-white text-gray-700 p-2 rounded-lg transition duration-150 ease-in-out">
                  Öğretmen
                </span>
              </label>
            </div>

            <div className="mt-5">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Giriş Yap
              </button>
            </div>
          </form>

          <div className="mt-5 flex flex-col gap-2">
            <p className="text-sm  text-gray-500 tracking-wide">
              Bir hesabınız yok mu ?{" "}
              <Link
                to={"/register"}
                className="text-yellow-400 font-semibold hover:underline ml-1"
              >
                Kayıt olun!
              </Link>
            </p>

            {isOpenResetPassword && (
              <Link
                to={"/forgot-password"}
                className="text-sm  text-red-500 font-semibold tracking-wide"
              >
                Şifrenizi mi unuttunuz ?{" "}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
