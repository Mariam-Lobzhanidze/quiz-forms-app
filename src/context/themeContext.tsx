import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./authContext";
import httpClient from "../axios";

type ThemeContextType = {
  theme: "light" | "dark";
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { activeUser, updateActiveUser } = useAuth();
  const [theme, setTheme] = useState<"light" | "dark">(activeUser?.theme || "light");

  useEffect(() => {
    setTheme(activeUser?.theme || "light");
  }, [activeUser?.theme]);

  const toggleTheme = async () => {
    const updatedTheme = theme === "light" ? "dark" : "light";
    setTheme(updatedTheme);
    updateActiveUser({ theme: updatedTheme });

    try {
      await httpClient.put(`/users/theme/${activeUser?.id}`, { theme: updatedTheme });
    } catch (error) {
      console.error("Failed to update user on the backend:", error);
    }
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
