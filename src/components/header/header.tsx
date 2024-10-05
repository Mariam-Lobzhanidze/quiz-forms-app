import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import "./header.scss";
import MobileNav from "./mobileNav";
import Dropdown from "../shared/dropdown";
// import { ThemeSwitcher } from "../shared/themeSwitcher";

interface HeaderProps {
  theme: "light" | "dark";
  onToggleTheme: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Header: React.FC<HeaderProps> = ({ theme, onToggleTheme }) => {
  const { isLoggedIn, handleLogout } = useAuth();

  const dropdownItems = [
    { label: "Profile", href: "/profile" },
    { label: "Settings", href: "/settings" },
    { label: "Sign out", onClick: handleLogout },
  ];

  return (
    <header className="p-3 mb-5 border-bottom">
      <div className="container d-flex align-items-center justify-content-between">
        <Link to="/" className="me-4 navbar-brand fs-5 fw-bold">
          Forms App
        </Link>
        <i
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvas"
          className="bi bi-list fs-3  d-lg-none d-flex"
          role="button"></i>

        <ul className="nav d-none d-lg-flex gap-1 align-items-center">
          <li>
            <Link to="#" className="nav-link px-2 fw-bold">
              Forms
            </Link>
          </li>
          <li>
            <Link to="#" className="nav-link px-2 fw-bold">
              Personal
            </Link>
          </li>
        </ul>
        <div className="d-none d-lg-flex gap-3 align-items-center">
          {/* <ThemeSwitcher /> */}
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="flexSwitchCheckDefault"
              role="button"
              checked={theme === "dark"}
              onChange={onToggleTheme}
            />
            {theme === "dark" ? (
              <i className="bi bi-moon-stars-fill"></i>
            ) : (
              <i className="bi bi-moon-stars"></i>
            )}
          </div>
          <button type="button" className="btn btn-sm btn-primary">
            En
          </button>
          <form role="search">
            <input
              type="search"
              className="form-control form-control-sm"
              placeholder="Search..."
              aria-label="Search"
            />
          </form>

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

      <MobileNav />
    </header>
  );
};

export default Header;
