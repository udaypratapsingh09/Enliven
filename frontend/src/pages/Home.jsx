import { useAuth } from "../context/AuthContext";
// eslint-disable-next-line no-unused-vars
import { ToastContainer, toast } from "react-toastify";

const Home = () => {
  const { username, logout } = useAuth();

  return (
    <>
      <div className="home_page">
        <h4>
          Welcome <span>{username ? username : "Guest"}</span>
        </h4>
        {username ? (
          <button onClick={logout}>LOGOUT</button>
        ) : (
          <a href="/login">LOGIN</a>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;
