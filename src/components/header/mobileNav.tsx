import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import Dropdown from "./dropdown";
import { ThemeSwitcher } from "../shared/themeSwitcher";
import LanguageSwitcher from "../shared/languageSwitcher";
import profileImage from "../../assets/profile_default.jpg";

const MobileNav: React.FC = () => {
  const { isLoggedIn, handleLogout, activeUser } = useAuth();

  const dropdownItems = [
    { label: "AdminPage", href: "/adminPage", visible: activeUser?.role === "admin" },
    { label: "Sign out", onClick: handleLogout },
  ];

  return (
    <div className="offcanvas offcanvas-start" tabIndex={-1} id="offcanvas">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasLabel">
          <Link to="/" className="me-4 navbar-brand fs-5 fw-bold navbar-brand">
            Forms App
          </Link>
        </h5>
        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>

      <div className="offcanvas-body d-flex flex-column gap-3 p-3 w-100">
        <hr />
        <ul className="nav nav-pills flex-column mb-auto gap-3">
          <li className="nav-item">
            <NavLink
              key={activeUser?.id}
              to={`/users/${activeUser?.id}/templates`}
              className={({ isActive }) => `nav-link px-2 ${isActive ? "active" : ""}`}>
              Templates table
            </NavLink>
          </li>
        </ul>

        <hr />

        {!isLoggedIn ? (
          <div className="d-lg-none d-flex gap-3 ">
            <Link to="/register" role="button" className="btn btn-sm btn-secondary">
              Register
            </Link>
            <Link to="/login" role="button" className="btn btn-sm btn-primary">
              Login
            </Link>
          </div>
        ) : (
          <div className="d-flex align-items-center justify-content-between">
            <Dropdown profileImage={profileImage} items={dropdownItems} />

            <ThemeSwitcher />
            <LanguageSwitcher />
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileNav;
