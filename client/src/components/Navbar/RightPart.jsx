import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

const RightPart = () => {
  const navLinkStyles = ({ isActive }) => {
    return {
      fontWeight: isActive ? "bold" : "500",
      textDecoration: isActive ? "none" : "underline",
    };
  };
  return (
    <ul className={styles.ulNav}>
      <NavLink style={navLinkStyles} className={styles.linkStyle} to="/signin">
        Signin
      </NavLink>
      <div style={{ color: "gray", fontSize: "18px" }}>or</div>
      <NavLink style={navLinkStyles} className={styles.linkStyle} to="/signup">
        Signup
      </NavLink>
    </ul>
  );
};

export default RightPart;
