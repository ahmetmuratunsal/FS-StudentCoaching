const Error = ({ isError }) => {
  return (
    <div className="flex flex-col items-center gap-2 my-10">
      <h1 className=" font-bold text-2xl text-red-500">{isError?.status}</h1>
      <h2 className=" text-xl">Üzgünüz bir hata oluştu :(</h2>
      <p className=" text-xl">
        Hata Mesajı : <span className="text-red-500"> {isError?.message}</span>{" "}
      </p>
    </div>
  );
};

export default Error;
