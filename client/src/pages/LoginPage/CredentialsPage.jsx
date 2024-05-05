import { Card } from "antd";
import Login from "../../components/Login/Login";
import Register from "../../components/Register/Register";
import { useLocation } from "react-router-dom";
import styles from "./LoginPage.module.css";

const CredentialsPage = () => {
  const location = useLocation();
  return (
    <Card
      className={styles.loginRegisterCard}
      title={<span style={{ fontSize: "24px" }}>Signin</span>}
    >
      {location.pathname === "/signin" && <Login />}
      {location.pathname === "/signup" && <Register />}
    </Card>
  );
};

export default CredentialsPage;
