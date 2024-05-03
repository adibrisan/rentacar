import { Row, Col } from "antd";
import Lottie from "react-lottie";
import carMoving from "../../assets/carMoving.json";
import easyRent from "../../assets/easyRent.json";
import journey from "../../assets/journey.json";
import styles from "./Footer.module.css";

const Footer = () => {
  const animationOptions = (animation) => ({
    loop: true,
    autoplay: true,
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid meet",
    },
  });
  return (
    <footer className={styles.footerContainer}>
      <Row justify="space-between">
        <Col xs={24} sm={24} md={24} lg={8}>
          <Lottie
            options={animationOptions(carMoving)}
            height={300}
            width={300}
          />
          <Lottie
            options={animationOptions(easyRent)}
            height={300}
            width={300}
          />
        </Col>
        <Col xs={24} sm={24} md={24} lg={8}>
          <div className={styles.mainPartContainer}>
            <p className={styles.footerParagraph}>Unlock Your Journey.</p>
            <Lottie
              options={animationOptions(journey)}
              height={300}
              width={300}
            />
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={8}>
          <div className={styles.footerProgram}>
            PROGRAM
            <ul>
              <li>MONDAY - FRIDAY 9:00 – 18:00</li>
              <li>Saturday - Sunday – 13:00</li>
            </ul>
            FIND US
            <ul>
              <li>Timisoara - Calea Martirilor 5 Bl. 4</li>
              <li>Bucuresti - Bv. Iuliu Maniu Bl.14 - Sector 6</li>
            </ul>
          </div>
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;
