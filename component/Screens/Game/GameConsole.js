import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import classNames from "../../../lib/classNames";
import { uiActions } from "../../../store/uiSlice";
import Button from "../../ui/Button/Button";
import ClientOnlyPortal from "../../ui/ClientOnlyPortal/ClientOnlyPortal";
import classes from "./GameConsole.module.scss";
import GameConsoleLifeCounter from "./GameConsoleLifeCounter";

const GameConsole = (props) => {
  const router = useRouter();
  const player = useSelector((state) => state.player);
  const game = useSelector((state) => state.game);
  const { life } = player;
  const { currentLevelScore } = game;
  const dispatch = useDispatch();

  const goToMeHandler = () => {
    dispatch(
      uiActions.showNotification({
        text: "您要退出游戏吗？您已消耗的1点动力值不会被自动恢复。",
        qrcode: false,
        handler: "goToMeFromGame",
      })
    );
  };

  const goBackHandler = () => {
    dispatch(
      uiActions.showNotification({
        text: "您要退出游戏吗？您已消耗的1点动力值不会被自动恢复。",
        qrcode: false,
        handler: "goBackFromGame",
      })
    );
  };

  return (
    <ClientOnlyPortal selector="[data-fixed]">
      <div className={classes.screen}>
        <div className={classes.bg}>
          <Button
            className={classes.profile}
            src={
              player.headimgurl ||
              "https://res.cloudinary.com/npc2021/image/upload/v1633443295/default_profile_image_3109ee6c17.jpg"
            }
            color="white"
            type="circle"
            ring={false}
            onClick={goToMeHandler}
          />

          <div className={classes.controls}>
            <div className={classes.control}>
              <Button color="white" type="circle" ring={false}>
                <GameConsoleLifeCounter life={life} />
              </Button>
              <span className={classes.label}>动力值</span>
            </div>

            <div className={classes.control}>
              <Button color="white" type="circle" ring={false}>
                {currentLevelScore}
              </Button>
              <span className={classes.label}>能量值</span>
            </div>

            <div className={classNames(classes.control, classes.back)}>
              <Button
                src="/icons/icon-angle-bracket-blue.svg"
                color="white"
                type="circle"
                ring={false}
                onClick={goBackHandler}
              />
            </div>
          </div>
        </div>
      </div>
    </ClientOnlyPortal>
  );
};

export default GameConsole;
