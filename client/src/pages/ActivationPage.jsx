import { toast } from "react-toastify";
import api from "../utils/api";
import { Navigate, useNavigate } from "react-router-dom";
import { logout } from "../utils/utils";

const ActivationPage = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return <Navigate to={"/"} replace />;
  const navigate = useNavigate();
  const handleActive = async () => {
    await api
      .patch(`/user/${user._id}`, { isActive: true })
      .then(() => {
        toast.success("Hesap aktif edildi.");
        logout();
        navigate("/login");
      })
      .catch((err) => {
        toast.error("Hesap aktif edilirken bir hata oluştu.");
      });
  };
  return (
    <div className="grid place-items-center h-screen">
      <div className="flex flex-col items-center gap-5">
        <h1 className="text-xl flex flex-col items-center">
          <span className="font-bold text-red-500 capitalize">
            Kullanıcı adı: {user.username}
          </span>{" "}
          isimli hesabınızı tekrardan aktif etmek için lütfen aşağıdaki linke
          tıklayınız.
        </h1>
        <button
          onClick={handleActive}
          className="bg-green-700 hover:bg-green-900 text-white font-semibold py-2 px-6 rounded-full text-xl"
        >
          Aktif Et
        </button>
      </div>
    </div>
  );
};

export default ActivationPage;
