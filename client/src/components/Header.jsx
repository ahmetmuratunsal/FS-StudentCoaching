import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="p-5 shadow">
      <div className="max-w-[1440px] mx-auto flex justify-between">
        <Link to={"/"}>
          <img className="w-[100px]" src="logo.png" alt="logo" />
        </Link>

        <div className="flex items-center gap-2">
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
        </div>
      </div>
    </header>
  );
};

export default Header;
