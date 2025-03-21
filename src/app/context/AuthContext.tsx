'use client'
import { createContext, useContext, useState, ReactNode, useEffect } from "react";


interface User {
  userId: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User & { token: string }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User & { token: string }) => {
    const { userId, email, token } = userData;
    
    const user = { userId, email };
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    console.log("user", user);
    setUser(user);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };



  const loadUser = () => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
  }

  useEffect(() => {
    loadUser();
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
};
