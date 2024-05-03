import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import styles from "./Layout.module.css";

const Layout = () => {
  return (
    <div className={styles.layoutContainer}>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
