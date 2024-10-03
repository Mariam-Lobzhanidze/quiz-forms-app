import React from "react";

interface HeaderProps {
  theme: "light" | "dark";
  onToggleTheme: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Header: React.FC<HeaderProps> = ({ theme, onToggleTheme }) => {
  return (
    <header className="w-100 p-3 mb-3 border-bottom">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <a
            href="/"
            className="nav-brand fs-5 fw-bold d-flex align-items-center mb-2 px-4 mb-lg-0 text-decoration-none">
            Forms App
          </a>
          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li>
              <a href="#" className="nav-link px-3">
                Templates
              </a>
            </li>
            <li>
              <a href="#" className="nav-link px-3">
                Forms
              </a>
            </li>
            <li>
              <a href="#" className="nav-link px-3">
                Favorites
              </a>
            </li>
            <li>
              <a href="#" className="nav-link px-3">
                Products
              </a>
            </li>
          </ul>
          <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
            <input type="search" className="form-control" placeholder="Search..." aria-label="Search" />
          </form>
          <div className="form-check form-switch me-3">
            <input
              className="form-check-input "
              type="checkbox"
              id="flexSwitchCheckDefault"
              role="button"
              checked={theme === "dark"}
              onChange={onToggleTheme}
            />
            {theme === "dark" ? <i className="bi bi-moon-fill"></i> : <i className="bi bi-moon"></i>}
          </div>

          <div className="dropdown">
            <a
              href="#"
              className="d-block text-decoration-none dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false">
              <img
                src="https://github.com/mdo.png"
                alt="mdo"
                width="32"
                height="32"
                className="rounded-circle"
              />
            </a>
            <ul className={`dropdown-menu text-small }`}>
              <li>
                <a className="dropdown-item" href="#">
                  Profile
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Settings
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Sign out
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
