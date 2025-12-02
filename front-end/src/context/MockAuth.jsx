import React, { createContext, useState, useContext } from "react";
import { authenticateUser } from "../data/mockData";

// 1️⃣ Create context
const AuthContext = createContext();

// 2️⃣ Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // login using mockData helper
  const login = (email, password) => {
    const authenticatedUser = authenticateUser(email, password);
    if (authenticatedUser) {
      setUser(authenticatedUser);
      return { success: true, user: authenticatedUser };
    }
    return { success: false, message: "Invalid email or password" };
  };

  // logout
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        role: user?.role || null,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// 3️⃣ Custom hook
export const useAuth = () => useContext(AuthContext);
