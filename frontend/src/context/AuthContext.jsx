import { createContext, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Create AuthContext
const AuthContext = createContext();

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [cookies, removeCookie] = useCookies(["token"]);
  const [username, setUsername] = useState(null);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  // Verify the user on app load
  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.token) {
        setUsername(null);
        setUserId(null);
        return;
      }

      try {
        const { data } = await axios.post(
          `${API_BASE_URL}/auth`,
          {},
          { withCredentials: true }
        );
        console.log(data);
        if (data.status) {
          setUsername(data.username);
          setUserId(data.userId);
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
    setUsername(null);
    setUserId(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ username, userId, setUsername, setUserId, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook to Use AuthContext
export const useAuth = () => useContext(AuthContext);
