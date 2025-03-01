import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import ProfileForm from "./pages/ProfileForm";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profileform" element={<ProfileForm />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
