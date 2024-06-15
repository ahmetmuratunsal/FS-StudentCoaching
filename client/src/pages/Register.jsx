import { inputField } from "../constants/inputField";
import { options } from "../constants/selectInput";
import RegisterInput from "./../components/RegisterInput";
import Select from "react-select";
const Register = () => {
  return (
    <div className="font-[sans-serif] bg-white text-white md:h-screen">
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
          <form className="max-w-lg w-full mx-auto">
            <div className="mb-12">
              <h3 className="text-3xl font-bold text-yellow-400">
                Hesap Oluştur
              </h3>
            </div>

            {inputField.map((item) => (
              <RegisterInput key={item.label} item={item} />
            ))}

            <div className="flex justify-between mt-10">
              <div className=" flex flex-col flex-1  gap-3">
                <h5 className="text-xs">Bulunduğunuz Şehri Seçiniz</h5>
                <Select
                  className=" text-black w-1/2 text-sm "
                  placeholder="Bir il seçin"
                  options={options}
                />
              </div>

              <div className=" flex flex-col items-center gap-3">
                <h5 className="text-sm">Öğrenci misin ?</h5>
                <label className="isStudentCheckbox">
                  <input defaultChecked="checked" type="checkbox" />
                  <div className="checkmark"></div>
                </label>
              </div>
            </div>
            {/* gizlilik onay alanı */}
            <div className="flex items-center gap-5 mt-8">
              <div className="checkbox-wrapper-19">
                <input
                  defaultChecked="checked"
                  id="cbtest-19"
                  type="checkbox"
                />
                <label className="check-box" htmlFor="cbtest-19"></label>
              </div>
              <h5 className="text-sm">
                Kişisel verilerimin işlenmesine yönelik{" "}
                <a
                  href="javascript:void(0);"
                  className="text-yellow-500 font-semibold hover:underline ml-1"
                >
                  Aydınlatma Metnini
                </a>{" "}
                okudum ve kabul ediyorum.
              </h5>
            </div>
            {/* <label htmlFor="remember-me" className="ml-3 block text-sm">
                
              </label> */}

            {/* kayıt ol butonu */}
            <div className="mt-12">
              <button
                type="button"
                className="w-max shadow-xl py-2.5 px-8 text-sm font-semibold rounded-md bg-transparent text-yellow-400 border border-yellow-400 focus:outline-none"
              >
                Kayıt Ol
              </button>
              <p className="text-sm mt-8">
                Zaten bir hesabın var mı ?{" "}
                <a
                  href="javascript:void(0);"
                  className="text-yellow-400 font-semibold hover:underline ml-1"
                >
                  Giriş Yap
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
