interface DropdownItem {
  label: string;
  href?: string;
  onClick?: () => void;
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
        {items.map((item, index) => (
          <li key={index}>
            <a
              className="dropdown-item"
              href={item.href || "#"}
              onClick={(e) => {
                if (item.onClick) {
                  e.preventDefault();
                  item.onClick();
                }
              }}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
