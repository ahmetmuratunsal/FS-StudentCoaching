import { Link, useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { logout } from "../utils/utils";

const Header = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleSearch = (e) => {
    //* sayfa yenileme engelle
    e.preventDefault();
    //* aratılan kelimeyi al
    const text = e.target[0].value;
    //* kullanıcıyı özel ders sayfasına yönlendir.
    navigate(`/search/privatelesson?title=${text}`);
    e.target[0].value = "";
  };
  return (
    <header className="p-5 shadow">
      <div className="max-w-[1440px] mx-auto flex justify-between items-center gap-4 md:gap-8">
        <Link to={"/"}>
          <img className="w-[100px]" src="/logo.png" alt="logo" />
        </Link>

        <form
          onSubmit={handleSearch}
          className="rounded-md flex  flex-1 items-center border max-w-[600px]"
        >
          <input
            className="w-full h-full px-3 outline-none "
            placeholder="Özel Ders Ara"
            type="search"
          />
          <button className="bg-black  p-2 rounded-md text-white text-xl max-md:hidden">
            <IoSearch />
          </button>
        </form>

        <div className="flex items-center gap-2 group z-50 relative">
          {user ? (
            <>
              <img
                className="h-[50px] w-[50px] rounded-full object-cover"
                src={user.profilePhoto}
                alt={user.username}
              />
              <span className="font-semibold capitalize">{user.username}</span>

              <div className="text-[13px] hidden group-hover:flex flex-col items-start absolute top-[50px] left-5 transition bg-gray-200 rounded-md">
                {!user.isStudent && (
                  <div className="flex flex-col bg-red-300">
                    <Link
                      to={"/teacherpanel"}
                      className="px-5 py-2 hover:bg-gray-100 whitespace-nowrap"
                    >
                      Öğretmen Paneli
                    </Link>
                    {user.isAdmin && (
                      <Link
                        to={"/adminpanel"}
                        className="px-5 py-2 hover:bg-gray-100 whitespace-nowrap"
                      >
                        Admin Paneli
                      </Link>
                    )}
                  </div>
                )}

                {user.isStudent && (
                  <Link
                    to={"/studentpanel"}
                    className="px-5 py-2 hover:bg-gray-100 whitespace-nowrap"
                  >
                    Öğrenci Paneli
                  </Link>
                )}
                <Link className="px-5 py-2 hover:bg-gray-100">Siparişler</Link>
                <Link className="px-5 py-2 hover:bg-gray-100">Mesajlar</Link>
                <button
                  onClick={() => logout().then(() => navigate("/"))}
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
