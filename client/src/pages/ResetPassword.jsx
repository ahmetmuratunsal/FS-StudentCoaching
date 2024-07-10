import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import api from "../utils/api";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .patch(`/auth/reset-password/${token}`, { password })
      .then((res) => {
        toast.success(res.data.message);
        navigate("/login");
      })
      .catch((err) => {
        toast.error(err.response.data?.message);
      });
  };

  return (
    <div className="flex font-poppins items-center justify-center dark:bg-gray-900 min-w-screen">
      <div className="grid gap-8">
        <div
          id="back-div"
          className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-[26px] m-4"
        >
          <div className="border-[20px] border-transparent rounded-[20px] dark:bg-gray-900 bg-white shadow-lg xl:p-10 2xl:p-10 lg:p-10 md:p-10 sm:p-2 m-2">
            <h1 className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent pt-2 pb-6 font-bold text-3xl dark:text-gray-400 text-center cursor-default">
              Şifremi Sıfırla
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 dark:text-gray-400 text-lg select-none"
                >
                  Yeni Şifrenizi Giriniz
                </label>
                <div className="relative">
                  <input
                    id="password"
                    className="border dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 p-3 mt-3 mb-2 shadow-md placeholder:text-xs border-gray-300 rounded-lg w-full focus:scale-105 ease-in-out duration-300 pr-10"
                    type={showPassword ? "text" : "password"}
                    placeholder="Şifrenizi kimseye göstermeyiniz"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="focus:outline-none bg-gradient-to-r from-blue-500 to-purple-500 p-1 rounded-full"
                    >
                      {showPassword ? (
                        <AiFillEyeInvisible className="h-5 w-5 text-white" />
                      ) : (
                        <AiFillEye className="h-5 w-5 text-white" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
              <button
                className="bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg mt-6 p-2 text-white rounded-lg w-full hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out"
                type="submit"
              >
                Şifremi Değiştir
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
