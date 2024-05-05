import { Card } from "antd";
import Login from "../../components/Login/Login";
import Register from "../../components/Register/Register";
import ForgotPassword from "../../components/ForgotPassword/ForgotPassword";
import { useLocation } from "react-router-dom";
import { getAuthCardTitle } from "../../utils/helper";
import styles from "./LoginPage.module.css";

const CredentialsPage = () => {
  const location = useLocation();
  const title = location.pathname.split("/")[1];
  return (
    <Card
      className={styles.loginRegisterCard}
      title={
        <span style={{ fontSize: "24px" }}>{getAuthCardTitle(title)}</span>
      }
    >
      {location.pathname === "/signin" && <Login />}
      {location.pathname === "/signup" && <Register />}
      {location.pathname === "/forgot-password" && <ForgotPassword />}
    </Card>
  );
};

export default CredentialsPage;
