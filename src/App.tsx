import { useEffect, useState } from "react";
import "./App.scss";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Header from "./components/header/header";
import Home from "./components/home/homePage";
import Footer from "./components/footer/footer";

function App() {
  const getInitialTheme = () => {
    const themeFromStorage = localStorage.getItem("theme");
    return themeFromStorage ? (themeFromStorage as "light" | "dark") : "light";
  };

  const [theme, setTheme] = useState<"light" | "dark">(getInitialTheme());

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleAppTheme = () => {
    setTheme((previousTheme) => (previousTheme === "light" ? "dark" : "light"));
  };

  return (
    <>
      <div className="container-fluid p-0" data-bs-theme={theme}>
        <Header theme={theme} onToggleTheme={toggleAppTheme} />
        <Home />

        <Footer />
      </div>
    </>
  );
}

export default App;
