import { useEffect, useState } from "react";
import "./App.scss";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import { AuthProvider } from "./context/authContext";
import { ThemeProvider } from "./context/themeContext";

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
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider>
            <div className="container-fluid d-flex flex-column p-0" data-bs-theme={theme}>
              <Header theme={theme} onToggleTheme={toggleAppTheme} />

              <div className="flex-grow-1 min-vh-100">
                <AppRoutes />
              </div>
              <div className="align-self-end w-100">
                <Footer />
              </div>
            </div>
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
