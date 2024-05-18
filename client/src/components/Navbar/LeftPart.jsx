import { Flex } from "antd";
import { NavLink } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";
import useUserStore from "../../store/useUserStore";
import toast from "react-hot-toast";
import useOrderStore from "../../store/useOrderStore";
import styles from "./Navbar.module.css";

const LeftPart = () => {
  const { orders } = useOrderStore();
  const activeOrder = orders.some((order) => order.orderStatus === "PENDING");
  const { currentUser } = useUserStore();
  const navLinkStyles = ({ isActive }) => {
    return {
      fontWeight: isActive ? "bold" : "500",
      textDecoration: isActive ? "underline" : "none",
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
      {!!currentUser && (
        <>
          {currentUser.isAdmin && (
            <NavLink
              style={navLinkStyles}
              className={styles.linkStyle}
              to="/allOrders"
              onClick={onClickUnauthorized}
            >
              Admin
            </NavLink>
          )}
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
              <div className={styles.cartIconcontainer}>
                <BsCart3 size={25} />
                {activeOrder && <div className={styles.redDot}></div>}
              </div>
            </Flex>
          </NavLink>
        </>
      )}
    </ul>
  );
};

export default LeftPart;
