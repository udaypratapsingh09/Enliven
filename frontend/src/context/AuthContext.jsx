import { createContext, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Create AuthContext
const AuthContext = createContext();

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [cookies, removeCookie] = useCookies(["token"]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Verify the user on app load
  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.token) {
        setUser(null);
        return;
      }

      try {
        const { data } = await axios.post(
          "http://localhost:3000/api/auth",
          {},
          { withCredentials: true }
        );

        if (data.status) {
          setUser(data.user);
        } else {
          removeCookie("token");
          navigate("/login");
        }
      } catch (error) {
        console.error("Auth verification failed:", error);
        removeCookie("token");
        navigate("/login");
      }
    };

    verifyUser();
  }, [cookies, navigate, removeCookie]);

  // Logout Function
  const logout = () => {
    removeCookie("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook to Use AuthContext
export const useAuth = () => useContext(AuthContext);
