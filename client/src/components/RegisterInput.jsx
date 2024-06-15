const RegisterInput = ({ item }) => {
  return (
    <div className="mt-5">
      <label className="text-xs block mb-2">{item.label}</label>
      <div className="relative flex items-center">
        <input
          name={item.name}
          type={item.type}
          required
          className="w-full bg-transparent  text-sm border-b border-gray-300 focus:border-yellow-400 px-2 py-3 outline-none"
          placeholder={item.placeholder}
        />
        {item.svg}
      </div>
    </div>
  );
};

export default RegisterInput;
