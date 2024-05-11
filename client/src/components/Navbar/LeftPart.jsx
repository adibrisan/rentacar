import { Flex } from "antd";
import { NavLink } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";
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
      <NavLink style={navLinkStyles} className={styles.linkStyle} to="/cart">
        <Flex align="center" gap={15}>
          <span>Cart</span>
          <BsCart3 size={25} />
        </Flex>
      </NavLink>
    </ul>
  );
};

export default LeftPart;
