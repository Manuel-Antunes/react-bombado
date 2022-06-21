import { createContext, useCallback, useContext, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import api from "../services/api";

export interface AuthContextData {
  signed: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    passwordConfirmation: string
  ) => Promise<void>;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

interface AuthProviderProps {
  children: React.ReactNode;
}

const MySwal = withReactContent(Swal);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [signed, setSigned] = useState(false);

  const login = useCallback(async (email: string, password: string) => {
    try {
      await api.post("/login", {
        email,
        password,
      });
      setSigned(true);
    } catch (error) {
      MySwal.fire(
        "Erro",
        "Ocorreu um erro ao fazer login, verifique suas credenciais",
        "error"
      );
    }
  }, []);

  const register = useCallback(
    async (
      name: string,
      email: string,
      password: string,
      passwordConfirmation: string
    ) => {
      try {
        await api.post("/users", {
          name,
          email,
          password,
          passwordConfirmation,
        });
      } catch (error) {
        MySwal.fire(
          "Erro",
          "Erro ao criar o usuário verifique os dados",
          "error"
        );
      }
    },
    []
  );

  return (
    <AuthContext.Provider value={{ signed, login, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
