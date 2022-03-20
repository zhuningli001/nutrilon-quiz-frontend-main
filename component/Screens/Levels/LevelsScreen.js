import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";
import { PASSING_LEVEL_SCORE } from "../../../store/gameSlice";
import { useDispatch, useSelector } from "react-redux";
import { LIFE_INTERVAL, playerActions } from "../../../store/playerSlice";
import { uiActions } from "../../../store/uiSlice";

import Button from "../../ui/Button/Button";
import Nav from "../../ui/Header/Nav";
import LevelRing from "../../ui/LevelRing/LevelRing";

import classes from "./LevelsScreen.module.scss";

const LevelsScreen = () => {
  const player = useSelector((state) => state.player);
  const dispatch = useDispatch();
  const [levels, setLevels] = useState([]);

  const router = useRouter();
  const btnRef = useRef(null);

  // Check player last game time
  useEffect(() => {
    const currentTime = Date.now();
    if (!player.lastGameAt) return;
    const timeDiff = currentTime - Number(player.lastGameAt);
    if (player.life < 3 && timeDiff >= LIFE_INTERVAL) {
      dispatch(
        playerActions.replacePlayerInfo({
          life: player.life + 1,
          lastGameAt: Date.now().toString(),
        })
      );
    }
  }, []);

  // UI
  useEffect(() => {
    setLevels(
      [0, 1, 2, 3, 4].map((index) =>
        index < player.currentLevel
          ? "passed"
          : index === player.currentLevel
          ? "active"
          : "inactive"
      )
    );
  }, [player.currentLevel]);

  // scroll to bottom
  useEffect(() => {
    gsap.registerPlugin(ScrollToPlugin);
    const tween = gsap.to(window, {
      duration: 1,
      delay: 0.5,
      scrollTo: btnRef.current,
      ease: "power3.in",
    });
    return () => {
      tween?.kill();
    };
  }, []);

  const startANewGameHandler = () => {
    if (player.life <= 0)
      dispatch(
        uiActions.showNotification({
          text: "您暂时没有足够的动力值开启探索之旅。\r\n请您对品牌充分了解后再次进行探索。 您可以在我们的公众号中了解我们的品牌。\r\n半小时后您会获得1点动力值。",
          qrcode: true,
          handler: "close",
        })
      );
    else
      dispatch(
        uiActions.showNotification({
          text: "确定要花费1点动力值去探索新城市吗？",
          qrcode: false,
          handler: "goToGame",
        })
      );
  };

  return (
    <>
      <Nav
        title="选择参观景点"
        className={classes.title}
        sideText="游戏说明"
        sideHref="/manual"
      />

      <div className={classes.content}>
        <section className={classes.map}>
          <LevelRing
            level={0}
            status={levels[0]}
            onClick={startANewGameHandler}
            custom={{ bottom: "-6%", left: "2%", transform: "translateY(40%)" }}
            text="祖特梅尔"
          />
          {/* bottom: "0", left: "8%" */}
          <LevelRing
            level={1}
            status={levels[1]}
            onClick={startANewGameHandler}
            custom={{
              right: "2%",
              bottom: "100px",
              transform: "translateY(50%)",
            }}
            text="乌得勒支"
          />
          {/*    right: "10%",
              bottom: "175px", */}
          <LevelRing
            level={2}
            status={levels[2]}
            onClick={startANewGameHandler}
            custom={{ left: "2%", top: "160px" }}
            text="克伊克"
          />
          {/* left: "3%", top: "80px" */}
          <LevelRing
            level={3}
            status={levels[3]}
            onClick={startANewGameHandler}
            custom={{ top: "16%", right: "4%" }}
            text="阿姆斯特丹"
          />
          {/* top: "-1%", right: "6%"  */}
          {/* To Do */}
          <LevelRing
            level={4}
            status={levels[4]}
            onClick={startANewGameHandler}
            custom={{ top: "-13%", left: "17%" }}
            text="库肯霍夫"
          />
        </section>

        {/* To Do */}
        {/* 1-4 level */}
        <section className={classes.action} ref={btnRef}>
          {player.currentLevel < 4 && (
            <Button onClick={startANewGameHandler}>即刻启程</Button>
          )}
          {/* {player.currentLevel === 4 && (
            <Button onClick={() => router.push("/me")}>领取证书</Button>
          )} */}
          {player.currentLevel === 4 && player.score5 < PASSING_LEVEL_SCORE && (
            <Button onClick={startANewGameHandler}>继续旅程</Button>
          )}
          {player.currentLevel === 5 && (
            <Button onClick={() => router.push("/me")}>升级证书</Button>
          )}
        </section>
        {/* level 5 ?*/}
        {/* 继续旅程 */}
        {/* 证书升级 */}
      </div>
    </>
  );
};

export default LevelsScreen;
