import { RxDashboard } from "react-icons/rx";
import { TiMessages } from "react-icons/ti";
import { VscQuestion, VscSettingsGear } from "react-icons/vsc";
import { SiGooglemeet } from "react-icons/si";
import { FaTurkishLiraSign } from "react-icons/fa6";
import { AiOutlineHome } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { IoIosAddCircleOutline, IoMdLogOut } from "react-icons/io";
import { logout } from "../../utils/utils";

const TeacherSidebar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  return (
    <div className="min-h-screen sticky top-0 left-0 h-screen">
      <div className="rounded-r bg-gray-900 xl:hidden flex justify-between w-full p-6 items-center ">
        <div className="flex justify-between  items-center space-x-3">
          <p className="text-base lg:text-2xl leading-6 text-white">
            Öğretmen Paneli
          </p>
        </div>
        <div aria-label="toggler" className="flex justify-center items-center">
          <button
            aria-label="open"
            id="open"
            // onClick="showNav(true)"
            className="hidden focus:outline-none focus:ring-2"
          >
            <svg
              className=""
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 6H20"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4 12H20"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4 18H20"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            aria-label="close"
            id="close"
            // onClick="showNav(true)"
            className=" focus:outline-none focus:ring-2"
          >
            <svg
              className=""
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 6L18 18"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
      <div
        id="Main"
        className="xl:rounded-r transform  xl:translate-x-0  ease-in-out transition duration-500 flex justify-start items-start h-full  w-full sm:w-64 bg-gray-900 flex-col"
      >
        <div className="hidden xl:flex justify-start p-6 items-center space-x-3">
          <p className="text-base lg:text-2xl leading-6 text-white">
            Öğretmen Paneli
          </p>
        </div>
        {/* Kontrol Paneli */}
        <div className="mt-6 flex flex-col justify-start items-center  pl-8 w-full border-gray-600 border-b space-y-3 pb-5 ">
          <Link
            to={"/"}
            className="flex jusitfy-start items-center mb-3 space-x-6 w-full  focus:outline-none  focus:text-indigo-400  text-white rounded "
          >
            <AiOutlineHome className="text-base lg:text-2xl" />

            <p className="text-base leading-4 ">Anasayfaya Dön</p>
          </Link>
          <Link
            to={"/teacherpanel"}
            className="flex jusitfy-start items-center space-x-6 w-full  focus:outline-none  focus:text-indigo-400  text-white rounded "
          >
            <RxDashboard className="text-base lg:text-2xl" />

            <p className="text-base leading-4 ">Kontrol Paneli</p>
          </Link>
        </div>

        <div className="flex flex-col justify-start items-center   px-6 border-b border-gray-600 w-full  ">
          <button
            // onClick="showMenu1(true)"
            className="focus:outline-none focus:text-indigo-400 text-left  text-white flex justify-between items-center w-full py-5 space-x-14  "
          >
            <p className="text-sm leading-5  uppercase">Öğretmen Alanı</p>
            <svg
              id="icon1"
              className="transform"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 15L12 9L6 15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          {/* Öğrenci Alanı */}
          <div
            id="menu1"
            className="flex justify-start  flex-col w-full text-base lg:text-lg md:w-auto items-start pb-1 "
          >
            {/* Mesajlar */}
            <Link className="flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2  w-full md:w-52">
              <TiMessages className="text-base lg:text-2xl" />

              <p className="text-base leading-4  ">Mesajlar</p>
            </Link>

            <Link
              to={"/teacherquestions"}
              className="flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2  w-full md:w-52"
            >
              <VscQuestion className="text-base lg:text-2xl" />

              <p className="text-base leading-4  ">Sorularım</p>
            </Link>
            <Link
              to={"/teachermeetings"}
              className="flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2  w-full md:w-52"
            >
              <SiGooglemeet className="text-base lg:text-2xl" />

              <p className="text-base leading-4  ">Randevularım</p>
            </Link>
            <Link className="flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2  w-full md:w-52">
              <FaTurkishLiraSign className="text-base lg:text-2xl" />

              <p className="text-base leading-4  ">Satın Aldıklarım</p>
            </Link>
          </div>
        </div>
        <div className="flex flex-col justify-start items-center   px-6 border-b border-gray-600 w-full  ">
          <button
            // onClick="showMenu2(true)"
            className="focus:outline-none focus:text-indigo-400  text-white flex justify-between items-center w-full py-5 space-x-14  "
          >
            <p className="text-sm leading-5 uppercase">Özel Derslerim</p>
            <svg
              id="icon2"
              className="transform rotate-180"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 15L12 9L6 15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <div className=" flex justify-start flex-col items-start pb-5 ">
            <Link
              to={"/my-privatelesson"}
              className="flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2  w-full md:w-52"
            >
              <svg
                className="fill-stroke"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 10L11 14L17 20L21 4L3 11L7 13L9 19L12 15"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="text-base leading-4  ">Özel Derslerim</p>
            </Link>
            <Link
              to={"/add-privatelesson"}
              className="flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2  w-full md:w-52"
            >
              <IoIosAddCircleOutline className="text-base lg:text-2xl" />

              <p className="text-base leading-4  ">Özel Ders Ekle</p>
            </Link>
          </div>
        </div>
        <div className="flex flex-col justify-start items-center   px-6 py-4 border-b border-gray-600 w-full  ">
          <Link
            to={`/userdetail/${user._id}`}
            className="flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2 w-full md:w-52"
          >
            <VscSettingsGear className="text-base lg:text-2xl" />

            <p className="text-base leading-4  ">Ayarlar</p>
          </Link>
          <button
            onClick={() => logout().then(() => navigate("/"))}
            className="flex justify-start items-center space-x-6 text-red-500 hover:text-white focus:bg-red-500 focus:text-white hover:bg-red-700 rounded px-3 py-2  w-full md:w-52"
          >
            <IoMdLogOut className="text-base lg:text-2xl" />

            <p className="text-base leading-4  ">Çıkış Yap</p>
          </button>
        </div>
        <div className="flex justify-end h-full w-full items-center px-4">
          <div className=" flex justify-between items-center w-full">
            <div className="flex justify-center items-center  space-x-2">
              <div className="cursor-pointer">
                <img
                  className="rounded-full w-[50px] h-[50px]"
                  src={user?.profilePhoto}
                  alt="avatar"
                />
              </div>
              <div className="flex justify-start flex-col items-start">
                <p className="cursor-pointer text-sm leading-5 capitalize text-white">
                  {user?.username}
                </p>
                <p className="cursor-pointer text-xs leading-3 text-gray-300">
                  {user?.email}
                </p>
              </div>
            </div>
            <VscSettingsGear className="text-white text-xl cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherSidebar;
