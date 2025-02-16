import { inputField } from "../constants/inputField";
import { cityOptions, lessonOptions } from "../constants/selectInput";
import Select from "react-select";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import api from "../utils/api";
import Input from "../components/Input";
import { upload } from "../utils/upload";

const Register = () => {
  const [isStudent, setIsStudent] = useState(true);
  const [isAgreementAccept, setIsAgreementAccept] = useState(true);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const navigate = useNavigate();

  const handleCityChange = (selectedCity) => {
    setSelectedCity(selectedCity);
  };

  const handleLessonChange = (selectedLesson) => {
    setSelectedLesson(selectedLesson);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // bir formdata örneği oluştur
    const formData = new FormData(e.target);

    // inputlardaki verilerden bir nesne tanımla
    const newUser = Object.fromEntries(formData.entries());

    // fotoğrafı bulut depolama alanına yükle
    const url = await upload(newUser.profilePhoto, "profile");

    // buluttaki fotoğrafın urlini nesneye kaydet
    newUser.username = newUser.username.toLowerCase();
    newUser.profilePhoto = url;

    // şehir bilgisini bu nesnenin içerisine kaydet.
    newUser.city = selectedCity.value;

    // eğer kullanıcı öğretmense ders bilgisi ekle
    if (isStudent === false) {
      newUser.lesson = selectedLesson.value.toLowerCase();
    }
    // öğrenci ise bunu nesnenin içerisine kaydet
    newUser.isStudent = isStudent;

    // kullanıcı hesabı oluşturmak için api isteği at.
    api
      .post("/auth/register", newUser)
      .then((res) => {
        // başarılı olursa logine yönlendir
        navigate("/login");
        // bildirim gönder
        toast.success(
          "Başarılı bir şekilde kayıt olundu. Giriş yapabilirsiniz."
        );
      })
      .catch((err) => {
        // başarısız olursa
        // bildirim gönder
        toast.error(`${err.response.data.status} ${err.response.data.message}`);
      });
  };

  return (
    <div className="font-[sans-serif] bg-white text-white md:h-screen mb-96 ">
      <div className="grid md:grid-cols-2 items-center gap-0 md:gap-6 h-full">
        <div className="max-md:order-1 w-full h-full relative bg-[url('/banner3.jpg')] bg-center bg-no-repeat bg-cover items-center ">
          <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
          <div className="w-full hidden md:flex md:flex-col absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <h3 className="text-white  text-center font-bold text-4xl ">
              Öğrenci Koçluk Sistemi
            </h3>
            <p className="text-center text-xl mt-2">
              Hayallerine ulaştırmak için buradayız.
            </p>
          </div>
        </div>
        <div className="flex items-center md:p-8 p-6 bg-[#0C172C] h-full lg:w-11/12 lg:ml-auto">
          <form onSubmit={handleSubmit} className="max-w-lg w-full mx-auto">
            <div className="mb-12">
              <h3 className="text-3xl font-bold text-yellow-400">
                Hesap Oluştur
              </h3>
            </div>

            {inputField.map((item) => (
              <Input
                key={item.label}
                svg={item.svg}
                name={item.name}
                label={item.label}
                type={item.type}
                placeholder={item.placeholder}
              />
            ))}

            <div className="flex justify-between mt-10">
              <div className=" flex flex-col flex-1  gap-3">
                <h5 className="text-xs">Bulunduğunuz Şehri Seçiniz</h5>
                <Select
                  className=" text-black w-1/2 text-sm "
                  placeholder="Bir il seçin"
                  value={selectedCity}
                  onChange={handleCityChange}
                  options={cityOptions}
                />
              </div>
              {/* isStudent checkbox */}
              <div className=" flex flex-col items-center gap-3">
                <h5 className="text-xs">Öğrenci misin ?</h5>
                <label className="isStudentCheckbox">
                  <input
                    onChange={(e) => setIsStudent(e.target.checked)}
                    defaultChecked={isStudent}
                    type="checkbox"
                  />
                  <div className="checkmark"></div>
                </label>
              </div>
            </div>

            {/* öğretmenler için alan */}
            {isStudent === false && (
              <div>
                {/* öğretmen bio alanı */}
                <div className="mt-5">
                  <label className="text-sm font-bold block mb-2">
                    Öğretmen Hakkında
                  </label>
                  <div className="relative flex items-center">
                    <input
                      name="bio"
                      type="text"
                      required={!isStudent}
                      className="w-full bg-transparent  text-sm border-b border-gray-300 focus:border-yellow-400 px-2 py-3 outline-none"
                      placeholder="Lütfen kendinizi tanıtınız"
                    />
                  </div>
                </div>
                {/* öğretmen alan kısmı */}
                <div className=" flex flex-col  gap-3 mt-5 ">
                  <h5 className="text-xs">Alanınızı seçiniz</h5>
                  <Select
                    className=" text-black w-1/2 text-sm "
                    placeholder="Alanınızı seçiniz"
                    value={selectedLesson}
                    onChange={handleLessonChange}
                    options={lessonOptions}
                  />
                </div>
              </div>
            )}

            {/* gizlilik onay alanı */}
            <div className="flex items-center gap-5 mt-8">
              <div className="checkbox-wrapper-19">
                <input
                  onChange={(e) => setIsAgreementAccept(e.target.checked)}
                  defaultChecked={isAgreementAccept}
                  id="cbtest-19"
                  type="checkbox"
                />
                <label className="check-box" htmlFor="cbtest-19"></label>
              </div>
              <h5 className="text-sm">
                Kişisel verilerimin işlenmesine yönelik{" "}
                <a
                  href="#"
                  className="text-yellow-500 font-semibold hover:underline ml-1"
                >
                  Aydınlatma Metnini
                </a>{" "}
                okudum ve kabul ediyorum.
              </h5>
            </div>

            {/* kayıt ol butonu */}
            <div className="mt-12">
              <button
                disabled={!isAgreementAccept}
                type="submit"
                className="w-max shadow-xl disabled:text-gray-500 disabled:border-gray-500 disabled:opacity-50 disabled:cursor-not-allowed py-2.5 px-8 text-sm font-semibold rounded-md bg-transparent text-yellow-400 border border-yellow-400 focus:outline-none"
              >
                {isAgreementAccept ? "Kayıt Ol" : "Sözleşmeyi Onaylamalısın :/"}
              </button>
              <p className="text-sm mt-8">
                Zaten bir hesabın var mı ?{" "}
                <Link
                  to={"/login"}
                  className="text-yellow-400 font-semibold hover:underline ml-1"
                >
                  Giriş Yap
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
