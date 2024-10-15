import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import "./header.scss";
import MobileNav from "./mobileNav";
import Dropdown from "./dropdown";
import { ThemeSwitcher } from "../shared/themeSwitcher";
import Search from "../shared/search";
import LanguageSwitcher from "../shared/languageSwitcher";

const Header: React.FC = () => {
  const { isLoggedIn, handleLogout, activeUser } = useAuth();

  const dropdownItems = [
    { label: "AdminPage", href: "/adminPage", visible: activeUser?.role === "admin" },
    { label: "Settings", href: "/settings" },
    { label: "Sign out", onClick: handleLogout },
  ];

  return (
    <header className="p-3 mb-5 border-bottom ">
      <div className="container d-flex align-items-center justify-content-between">
        <div className="d-flex gap-2 align-items-center">
          <Link to="/" className="me-4 navbar-brand fs-5 fw-bold navbar-brand">
            Forms App
          </Link>
          <ul className="nav d-none d-lg-flex gap-1 align-items-center">
            <li>
              <Link to="#" className="nav-link px-2">
                form
              </Link>
            </li>
            <li>
              <Link to="/tabs" className="nav-link px-2">
                Template form
              </Link>
            </li>
          </ul>
        </div>

        <i
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvas"
          className="bi bi-list fs-3  d-lg-none d-flex"
          role="button"></i>

        <div className="d-none d-lg-flex gap-3 align-items-center">
          <Search />
          <ThemeSwitcher />
          <LanguageSwitcher />

          {!isLoggedIn ? (
            <div className="d-none d-lg-flex gap-3 ">
              <Link to="/register" role="button" className="btn btn-sm btn-secondary">
                Register
              </Link>
              <Link to="/login" role="button" className="btn btn-sm btn-primary">
                Login
              </Link>
            </div>
          ) : (
            <Dropdown profileImage="https://github.com/mdo.png" items={dropdownItems} />
          )}
        </div>
      </div>
      <div className="container d-lg-none d-block mt-4">
        <Search />
      </div>

      <MobileNav />
    </header>
  );
};

export default Header;
