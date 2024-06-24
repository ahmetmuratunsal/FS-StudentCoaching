import { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

const HomeMenu = () => {
  const navItems = [
    { id: 1, text: "Hakkımızda", to: "/hakkimizda" },
    { id: 2, text: "Başarılarımız", to: "/basarilarimiz" },
    { id: 3, text: "Neler Yapıyoruz?", to: "/neleryapiyoruz" },
    { id: 4, text: "Rehberlik", to: "/rehberlik" },
    { id: 4, text: "Özel Dersler", to: "/search/privatelesson" },
    { id: 4, text: "İletişim", to: "/iletisim" },
  ];
  // State to manage the navbar's visibility
  const [nav, setNav] = useState(false);

  // Toggle function to handle the navbar's display
  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className="m-[-20px]  flex justify-center items-center h-14 max-w-[1240px] px-4  shadow-lg rounded-full text-black">
      {/* Desktop Navigation */}
      <ul className="hidden lg:flex">
        {navItems.map((item, i) => (
          <li
            key={i}
            className="py-2 px-4 hover:bg-[#00df9a] rounded-xl m-2 cursor-pointer duration-300 hover:text-black"
          >
            <Link to={item.to}>{item.text}</Link>
          </li>
        ))}
      </ul>

      {/* Mobile Navigation Icon */}
      <div onClick={handleNav} className="block  lg:hidden">
        {nav ? (
          <AiOutlineClose className="text-3xl text-[#00df9a] cursor-pointer" />
        ) : (
          <AiOutlineMenu className="text-3xl text-[#00df9a] cursor-pointer" />
        )}
      </div>

      {/* Mobile Navigation Menu */}
      <ul
        className={
          nav
            ? "fixed lg:hidden justify-end left-0 top-0 w-[40%] h-full border-r border-r-gray-900 bg-white ease-in-out duration-500"
            : "ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]"
        }
      >
        {/* Mobile Logo */}
        <h1
          onClick={() => handleNav(false)}
          className="w-full text-4xl font-bold   text-[#00df9a] m-4 cursor-pointer"
        >
          <AiOutlineClose />
        </h1>

        {/* Mobile Navigation Items */}
        {navItems.map((item, i) => (
          <li
            key={i}
            className="p-4 border-b  rounded-xl hover:bg-[#00df9a] duration-300 hover:text-black cursor-pointer border-gray-600"
          >
            <Link to={item.to}>{item.text}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomeMenu;
