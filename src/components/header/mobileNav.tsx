import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import Dropdown from "../shared/dropdown";

const MobileNav: React.FC = () => {
  const { isLoggedIn, handleLogout } = useAuth();

  const dropdownItems = [
    { label: "Profile", href: "/profile" },
    { label: "Settings", href: "/settings" },
    { label: "Sign out", onClick: handleLogout },
  ];

  return (
    <div className="offcanvas offcanvas-start" tabIndex={-1} id="offcanvas">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasLabel">
          Forms App
        </h5>
        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body d-flex flex-column flex-shrink-0 p-3 w-100">
        <hr />
        <ul className="nav nav-pills flex-column mb-auto gap-3">
          <li className="nav-item">
            <Link to="#" className="nav-link active" aria-current="page">
              <svg className="bi pe-none me-2" width="16" height="16">
                <use href="#home"></use>
              </svg>
              Home
            </Link>
          </li>
          <li>
            <Link to="#" className="nav-link text-white">
              <svg className="bi pe-none me-2" width="16" height="16">
                <use href="#speedometer2"></use>
              </svg>
              Dashboard
            </Link>
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
          <Dropdown profileImage="https://github.com/mdo.png" items={dropdownItems} />
        )}
      </div>
    </div>
  );
};

export default MobileNav;
