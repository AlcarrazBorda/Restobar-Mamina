import React, { createContext, useContext, useState, useEffect } from "react";

export interface User {
  id: string;
  name: string; // Apellidos y Nombres
  email: string;
  phone: string; // Número de celular
  birthDate: string; // Fecha de nacimiento (YYYY-MM-DD)
  provider: "google" | "facebook";
  avatar?: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  login: (userData: Omit<User, "id" | "createdAt">) => void;
  updateProfile: (updatedFields: Partial<Omit<User, "id" | "provider" | "createdAt">>) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "mamina_user_session";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (e) {
      console.error("Error saving auth state", e);
    }
  }, [user]);

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  const login = (userData: Omit<User, "id" | "createdAt">) => {
    const newUser: User = {
      ...userData,
      id: "usr_" + Math.random().toString(36).substring(2, 9),
      createdAt: new Date().toLocaleDateString("es-PE", { year: "numeric", month: "short", day: "numeric" }),
    };
    setUser(newUser);
  };

  const updateProfile = (updatedFields: Partial<Omit<User, "id" | "provider" | "createdAt">>) => {
    setUser((prev) => (prev ? { ...prev, ...updatedFields } : null));
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        login,
        updateProfile,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
