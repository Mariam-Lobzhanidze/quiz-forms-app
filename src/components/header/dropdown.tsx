import { Link } from "react-router-dom";

interface DropdownItem {
  label: string;
  href?: string;
  onClick?: () => void;
  visible?: boolean;
}

interface DropdownProps {
  profileImage: string;
  items: DropdownItem[];
}

const Dropdown: React.FC<DropdownProps> = ({ profileImage, items }) => {
  return (
    <div className="dropdown">
      <a href="#" className="d-block dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
        <img src={profileImage} alt="user-profile-image" width="30" height="30" className="rounded-circle" />
      </a>
      <ul className="dropdown-menu">
        {items
          .filter((item) => item.visible !== false)
          .map((item, index) => (
            <li key={index}>
              <Link
                className="dropdown-item"
                to={item.href || "#"}
                onClick={(e) => {
                  if (item.onClick) {
                    e.preventDefault();
                    item.onClick();
                  }
                }}>
                {item.label}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Dropdown;
