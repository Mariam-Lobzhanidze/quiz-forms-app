import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { QuestionsProvider } from "./context/questionsContext";
import ProtectedRoute from "./protectedRoutes";

const Home = React.lazy(() => import("./components/home/homePage"));
const Login = React.lazy(() => import("./components/auth/login"));
const Register = React.lazy(() => import("./components/auth/register"));

const TabNavigation = React.lazy(() => import("./components/template/tabComponent"));
const AdminPage = React.lazy(() => import("./components/admin/adminPage"));

const publicRoutes = [
  { path: "/", element: <Navigate to="/home" replace /> },
  { path: "/home", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
];

const protectedRoutes = [
  { path: "/tabs", element: <TabNavigation />, provider: true },
  { path: "/adminPage", element: <AdminPage />, provider: false },
];

const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<p>...loading</p>}>
      <Routes>
        {publicRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}

        {protectedRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <ProtectedRoute>
                {route.provider ? <QuestionsProvider>{route.element}</QuestionsProvider> : route.element}
              </ProtectedRoute>
            }
          />
        ))}

        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
