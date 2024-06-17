const Input = ({ name, type = "text", placeholder, svg = "", label }) => {
  return (
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
