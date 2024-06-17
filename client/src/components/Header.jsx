import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../utils/api";

const Header = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const logout = () => {
    api
      .post("/auth/logout")
      .then((res) => {
        localStorage.removeItem("user");
        toast.success(res.data.message);
        navigate("/");
      })
      .catch((err) =>
        toast.error(`Çıkış yapılırken bir sorun oluştu ${err.message}`)
      );
  };
  return (
    <header className="p-5 shadow">
      <div className="max-w-[1440px] mx-auto flex justify-between">
        <Link to={"/"}>
          <img className="w-[100px]" src="logo.png" alt="logo" />
        </Link>

        <div className="flex items-center gap-2 group relative">
          {user ? (
            <>
              <img
                className="h-[50px] w-[50px] rounded-full object-cover"
                src={user.profilePhoto}
                alt={user.username}
              />
              <span className="font-semibold capitalize">{user.username}</span>

              <div className="text-[13px] hidden group-hover:flex flex-col items-start absolute top-[80px] right-0 transition bg-gray-200 rounded-md">
                {!user.isStudent && (
                  <>
                    <Link className="px-5 py-2 hover:bg-gray-100">
                      Özel Dersler
                    </Link>
                    <Link className="px-5 py-2 hover:bg-gray-100">
                      Randevular
                    </Link>
                  </>
                )}
                <Link className="px-5 py-2 hover:bg-gray-100">Siparişler</Link>
                <Link className="px-5 py-2 hover:bg-gray-100">Mesajlar</Link>
                <button
                  onClick={logout}
                  className="px-5 py-2 hover:bg-gray-100"
                >
                  Çıkış Yap
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to={"/login"} className="loginBtn">
                <div>
                  <span>
                    <p>Giriş Yap</p>
                    <p>:)</p>
                  </span>
                </div>
                <div>
                  <span>
                    <p>Özledik</p>
                    <p>:D</p>
                  </span>
                </div>
              </Link>
              <Link to={"/register"} className="registerBtn">
                <div>
                  <span>
                    <p>Kayıt Ol</p>
                    <p>:)</p>
                  </span>
                </div>
                <div>
                  <span>
                    <p>Bekliyoruz</p>
                    <p>❤️</p>
                  </span>
                </div>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
