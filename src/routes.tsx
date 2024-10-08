import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import TemplateForm from "./components/template/templateForm";
import { QuestionsProvider } from "./context/questionsContext";

const Home = React.lazy(() => import("./components/home/homePage"));
const Login = React.lazy(() => import("./components/auth/login"));
const Register = React.lazy(() => import("./components/auth/register"));

const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<p>...loading</p>}>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/templateForm" element={<TemplateForm />} /> */}

        <Route
          path="/templateForm"
          element={
            <QuestionsProvider>
              <TemplateForm />
            </QuestionsProvider>
          }
        />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
