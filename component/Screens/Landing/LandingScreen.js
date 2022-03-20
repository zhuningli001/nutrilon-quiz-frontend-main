import Link from "next/link";
import Button from "../../ui/Button/Button";
import Img from "../../ui/Image/Img";
import LevelRing from "../../ui/LevelRing/LevelRing";

import classes from "./LandingScreen.module.scss";

const LandingScreen = (props) => {
  return (
    <>
      <div className={classes.interaction}>
        <Img
          src="https://res.cloudinary.com/npc2021/image/upload/v1634138351/title_2x_9f3274c7c1.png"
          width={688}
          height={368}
        />
        <div className={classes.buttons}>
          <Button size="m">
            <Link href="/levels">开始游戏</Link>
          </Button>
          <Button size="m">
            <Link href="/manual">游戏说明</Link>
          </Button>
        </div>
      </div>

      <div className={classes.levels}>
        <LevelRing
          float
          size="42vw"
          active={true}
          custom={{
            top: "7%",
            left: "-4%",
            maxWidth: "210px",
            maxHeight: "210px",
          }}
          level={0}
        />
        <LevelRing
          float
          size="52vw"
          active={true}
          custom={{
            top: "14%",
            right: "-10%",
            maxWidth: "260px",
            maxHeight: "260px",
          }}
          level={1}
        />
        <LevelRing
          float
          size="49vw"
          active={true}
          custom={{
            bottom: "15%",
            left: "-12%",
            maxWidth: "245px",
            maxHeight: "245px",
          }}
          level={2}
        />
        <LevelRing
          float
          size="57vw"
          active={true}
          custom={{
            bottom: "2%",
            right: "-15%",
            maxWidth: "285px",
            maxHeight: "285px",
          }}
          level={3}
        />
        <LevelRing
          float
          size="35vw"
          active={true}
          custom={{
            top: "-5%",
            left: "35%",
            maxWidth: "200px",
            maxHeight: "200px",
          }}
          level={4}
        />
      </div>
    </>
  );
};

export default LandingScreen;
