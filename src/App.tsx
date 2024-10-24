import "./App.scss";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import { BrowserRouter, useLocation } from "react-router-dom";
import AppRoutes from "./routes";
import { AuthProvider } from "./context/authContext";
import { ThemeProvider, useTheme } from "./context/themeContext";
import { CloudinaryProvider } from "./context/cloudinaryContext";

function AppContent() {
  const location = useLocation();
  const hideFooterOnRoutes = ["/tabs"];
  const { theme } = useTheme();

  return (
    <div className="container-fluid d-flex flex-column p-0" data-bs-theme={theme}>
      <Header />
      <div className="flex-grow-1 min-vh-100">
        <AppRoutes />
      </div>
      {!hideFooterOnRoutes.includes(location.pathname) && (
        <div className="align-self-end w-100">
          <Footer />
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <CloudinaryProvider>
            <AppContent />
          </CloudinaryProvider>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
