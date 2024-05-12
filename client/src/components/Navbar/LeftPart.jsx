import { Flex } from "antd";
import { NavLink } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";
import useUserStore from "../../store/useUserStore";
import toast from "react-hot-toast";
import styles from "./Navbar.module.css";

const LeftPart = () => {
  const { currentUser } = useUserStore();
  const navLinkStyles = ({ isActive }) => {
    return {
      fontWeight: isActive ? "bold" : "500",
      textDecoration: isActive ? "none" : "underline",
    };
  };
  const onClickUnauthorized = () => {
    if (!currentUser) {
      toast.error("You need to signin !");
    }
  };
  return (
    <ul className={styles.ulNav}>
      <NavLink style={navLinkStyles} className={styles.linkStyle} to="/">
        Home
      </NavLink>
      <NavLink
        style={navLinkStyles}
        className={styles.linkStyle}
        to="/profile"
        onClick={onClickUnauthorized}
      >
        Profile
      </NavLink>
      <NavLink
        style={navLinkStyles}
        className={styles.linkStyle}
        to="/cart"
        onClick={onClickUnauthorized}
      >
        <Flex align="center" gap={15}>
          <span>Cart</span>
          <BsCart3 size={25} />
        </Flex>
      </NavLink>
    </ul>
  );
};

export default LeftPart;
