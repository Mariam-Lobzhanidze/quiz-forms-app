import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="pt-4 pb-5 mt-5">
      <ul className="nav justify-content-center border-bottom  pb-3 mb-5">
        <li className="nav-item">
          <Link to="/" className="nav-link px-2">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/tabs" className="nav-link px-2">
            Templates table
          </Link>
        </li>
      </ul>
      <p className="text-center fw-bold">© 2024 ML</p>
    </footer>
  );
};

export default Footer;
