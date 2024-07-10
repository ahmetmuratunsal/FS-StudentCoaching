import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [isStudent, setIsStudent] = useState(true);
  const [email, setEmail] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();

    await api
      .post("/auth/forgot-password", { email, isStudent })
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => toast.error(err.response.data?.message));
  };
  return (
    <main id="content" role="main" className="w-full  max-w-md mx-auto p-6">
      <div className="mt-7 bg-white  rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700 border-2 border-indigo-300">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
              Şifremi Unuttum
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Şifrenizi hatırladıysanız
              <Link
                to={"/login"}
                className="text-blue-600 decoration-2 hover:underline font-medium ms-2"
              >
                Giriş Yapın.
              </Link>
            </p>
          </div>

          <div className="mt-5">
            <form onSubmit={handleSubmit}>
              <div className="grid gap-y-4">
                {/* Email alanı */}
                <div>
                  <label
                    for="email"
                    className="block text-sm font-bold ml-1 mb-2 dark:text-white"
                  >
                    Email adresinizi giriniz
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      onChange={(e) => setEmail(e.target.value)}
                      className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                      required
                      aria-describedby="email-error"
                    />
                  </div>
                  <p
                    className="hidden text-xs text-red-600 mt-2"
                    id="email-error"
                  >
                    Size geri dönebilmemiz için lütfen geçerli bir e-posta
                    adresi ekleyin
                  </p>
                </div>

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

                <button
                  type="submit"
                  className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                >
                  Şifreyi Sıfırla
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ForgotPassword;
