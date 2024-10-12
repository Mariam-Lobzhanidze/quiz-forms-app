import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../components/shared/types";

type AuthContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  handleLogout: () => void;
  login: (token: string, user: User) => void;
  activeUser: User | null;
  updateActiveUser: (user: Partial<User>) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [activeUser, setActiveUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const storedUser = localStorage.getItem("activeUser");
      if (storedUser) {
        setActiveUser(JSON.parse(storedUser));
      }
      setIsLoggedIn(true);
    }
  }, []);

  const login = (token: string, user: User) => {
    localStorage.setItem("authToken", token);
    setActiveUser(user);
    localStorage.setItem("activeUser", JSON.stringify(user));

    setIsLoggedIn(true);
    navigate("/home");
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("activeUser");
    setIsLoggedIn(false);
    setActiveUser(null);
    navigate("/home");
  };

  const updateActiveUser = async (user: Partial<User>) => {
    if (activeUser) {
      const updatedUser = { ...activeUser, ...user };
      setActiveUser(updatedUser);
      localStorage.setItem("activeUser", JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, handleLogout, login, activeUser, updateActiveUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
