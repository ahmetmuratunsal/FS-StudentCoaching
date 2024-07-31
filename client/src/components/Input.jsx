import { useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
const Input = ({ name, type = "text", placeholder, svg = "", label }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  return name === "password" ? (
    <div className="mt-5">
      <label htmlFor="password" className="text-sm font-bold block mb-2">
        Şifreniz
      </label>
      <div className="relative flex items-center">
        <input
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="Şifrenizi giriniz"
          className="w-full bg-transparent  text-sm border-b border-gray-300 focus:border-yellow-400 px-2 py-3 outline-none"
        />
        <div
          className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
          onClick={handleTogglePassword}
        >
          {showPassword ? (
            <MdVisibilityOff size={20} color="#bbb" />
          ) : (
            <MdVisibility size={20} color="#bbb" />
          )}
        </div>
      </div>
    </div>
  ) : (
    <div className="mt-5">
      <label className="text-sm font-bold block mb-2">{label}</label>
      <div className="relative flex items-center">
        <input
          name={name}
          type={type}
          required
          className="w-full bg-transparent  text-sm border-b border-gray-300 focus:border-yellow-400 px-2 py-3 outline-none"
          placeholder={placeholder}
        />
        {svg}
      </div>
    </div>
  );
};

export default Input;
