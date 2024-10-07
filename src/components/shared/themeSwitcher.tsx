import { useTheme } from "../../context/themeContext";

export const ThemeSwitcher: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        id="flexSwitchCheckDefault"
        checked={theme === "dark"}
        onChange={toggleTheme}
        role="button"
      />
      {theme === "dark" ? <i className="bi bi-moon-stars-fill"></i> : <i className="bi bi-moon-stars"></i>}
    </div>
  );
};
