import React, { createContext, useState, useContext } from "react";
import axios from "axios"; // 1. Import axios
// import { authenticateUser } from "../data/mockData"; // You can remove or comment this out

// 1️⃣ Create context
const AuthContext = createContext();

// 2️⃣ Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // 2. Modify login function to be async and use axios
  const login = async (email, password) => {
    const loginUrl = "http://localhost:8080/api/auth/login"; // Matches the documentation [cite: 581]
    
    // According to the documentation, the login endpoint expects a JSON body
    // with "email" and "password" fields. [cite: 584, 585, 586]
    const credentials = {
      email,
      password,
    };

    try {
      const response = await axios.post(loginUrl, credentials);

      // Assuming a successful 200 OK response [cite: 588]
      // The response.data should contain the user object (e.g., userId, name, user_role) [cite: 591, 592, 593]
      const authenticatedUser = {
          id: response.data.user_id,
          name: response.data.name,
          role: response.data.user_role // Use the role from the API response
      };

      setUser(authenticatedUser);
      // The backend uses JWT authentication, likely stored in an httponly cookie. 
      // Axios will handle sending this cookie with subsequent requests. [cite: 1360, 1368, 1369]
      
      return { success: true, user: authenticatedUser };

    } catch (error) {
      console.error("Login failed:", error.response ? error.response.data : error.message);
      
      // Handle specific API error responses documented in the setup guide:
      // 401 Unauthorized for Invalid password [cite: 595, 597]
      // 404 Not Found for Account not found [cite: 599, 600]
      // 500 Internal Server Error [cite: 602, 603]
      
      let errorMessage = "An unexpected error occurred.";
      if (error.response) {
        // Use the error message returned from the API if available
        errorMessage = error.response.data.error || errorMessage;
      } else {
        errorMessage = "Network or server error.";
      }

      return { success: false, message: errorMessage };
    }
  };

  // logout
  const logout = () => {
    // Note: A backend POST /api/auth/logout is also documented, 
    // but clearing the local user state is a necessary front-end action.
    // For a complete solution, you might add an axios.post to /api/auth/logout here 
    // to invalidate the server-side session/cookie.
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