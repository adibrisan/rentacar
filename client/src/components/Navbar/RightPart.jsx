import { NavLink } from "react-router-dom";
import useUserStore from "../../store/useUserStore";
import api from "../../utils/axiosInstance";
import styles from "./Navbar.module.css";

const RightPart = () => {
  const { currentUser, setCurrentUser } = useUserStore();
  const navLinkStyles = ({ isActive }) => {
    return {
      fontWeight: isActive ? "bold" : "500",
      textDecoration: isActive ? "underline" : "none",
    };
  };
  const handleLogout = async () => {
    try {
      setCurrentUser(null);
      await api.post("/auth/logout");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <ul className={styles.ulNav}>
      {!currentUser ? (
        <>
          <NavLink
            style={navLinkStyles}
            className={styles.linkStyle}
            to="/signin"
          >
            Signin
          </NavLink>
          <div style={{ color: "gray", fontSize: "18px" }}>or</div>
          <NavLink
            style={navLinkStyles}
            className={styles.linkStyle}
            to="/signup"
          >
            Signup
          </NavLink>
        </>
      ) : (
        <NavLink
          style={navLinkStyles}
          className={styles.linkStyle}
          to="/"
          onClick={handleLogout}
        >
          Logout
        </NavLink>
      )}
    </ul>
  );
};

export default RightPart;
