import { Card } from "antd";
import Login from "../../components/Login/Login";
import usePersistUser from "../../hooks/usePersistUser";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
  usePersistUser();
  return (
    <Card
      className={styles.loginRegisterCard}
      title={<span style={{ fontSize: "24px" }}>Signin</span>}
    >
      <Login />
    </Card>
  );
};

export default LoginPage;
