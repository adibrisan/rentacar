import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import image404 from "../../assets/404.JPG";
import styles from "./NotFound.module.css";

const NotFound = () => {
  const navigate = useNavigate();
  const handleOnClick = () => navigate("/");
  return (
    <Result
      icon={<img className={styles.notFoundImage} src={image404} alt="404" />}
      extra={
        <Button size="large" type="primary" onClick={handleOnClick}>
          Back Home
        </Button>
      }
    />
  );
};

export default NotFound;
