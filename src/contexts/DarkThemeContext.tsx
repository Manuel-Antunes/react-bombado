import { createContext, useContext, useState } from "react";

interface AuthContextData {
  isDark: boolean;
  setIsDark: (isDark: boolean) => void;
}

const DarkTemeContext = createContext({} as AuthContextData);

interface DarkThemeProviderProps {
  children: React.ReactNode;
}

export const DarkThemeProvider: React.FC<DarkThemeProviderProps> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  return (
    <DarkTemeContext.Provider value={{ isDark, setIsDark }}>
      {children}
    </DarkTemeContext.Provider>
  );
};

export const useDarkTheme = () => {
  const context = useContext(DarkTemeContext);
  if (!context) {
    throw new Error("useDarkTheme must be used within a DarkThemeProvider");
  }
  return context;
}