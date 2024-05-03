import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Grid, Drawer, Button } from "antd";
import { CarTwoTone } from "@ant-design/icons";
import LeftPart from "./LeftPart";
import RightPart from "./RightPart";
import styles from "./Navbar.module.css";

const { useBreakpoint } = Grid;

const Navbar = () => {
  const { md } = useBreakpoint();
  const [isVisible, setIsVisible] = useState(false);
  const showDrawer = () => setIsVisible(true);
  const closeDrawer = () => setIsVisible(false);

  useEffect(() => {
    if (md) {
      setIsVisible(false);
    }
  }, [md]);

  return (
    <nav className={styles.menuBar}>
      <div className={styles.logo}>
        <Link to="/">
          <CarTwoTone style={{ fontSize: "40px" }} />
        </Link>
      </div>
      <div className={styles.menuCon}>
        <div className={styles.menuHorizontal}>
          <div className={styles.leftMenu}>
            <LeftPart />
          </div>
          <div className={styles.rightMenu}>
            <RightPart />
          </div>
        </div>
        <Button className={styles.barsMenu} type="primary" onClick={showDrawer}>
          <span className={styles.barsBtn}></span>
        </Button>
        <Drawer
          title="Basic Drawer"
          placement="right"
          closable={true}
          onClose={closeDrawer}
          open={isVisible}
        >
          <LeftPart />
          <RightPart />
        </Drawer>
      </div>
    </nav>
  );
};

export default Navbar;
