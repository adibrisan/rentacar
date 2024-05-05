import { Card } from "antd";
import Login from "../../components/Login/Login";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
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
