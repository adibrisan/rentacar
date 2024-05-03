import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

const LeftPart = () => {
  const navLinkStyles = ({ isActive }) => {
    return {
      fontWeight: isActive ? "bold" : "500",
      textDecoration: isActive ? "none" : "underline",
    };
  };
  return (
    <ul className={styles.ulNav}>
      <NavLink style={navLinkStyles} className={styles.linkStyle} to="/">
        Home
      </NavLink>
      <NavLink style={navLinkStyles} className={styles.linkStyle} to="/test">
        Test
      </NavLink>
      <NavLink style={navLinkStyles} className={styles.linkStyle} to="/contact">
        Contact
      </NavLink>
    </ul>
  );
};

export default LeftPart;
