import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Bg from "../component/ui/Background/Bg";
import Img from "../component/ui/Image/Img";
import { getBrandImage } from "../lib/brandAssets";
import { playerActions } from "../store/playerSlice";
import classes from "../styles/Logout.module.scss";

const Logout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("NUTRILON_PLAYER"))
      dispatch(playerActions.logout());
  }, []);

  return (
    <>
      <Bg />
      <div className={classes.wrapper}>
        <p className={classes.instruction}>
          <span>您已成功退出游戏，请关闭浏览器。 </span>
          <span>我们期待与您的下次见面。</span>
        </p>

        <div className={classes.qrcode}>
          <Img {...getBrandImage("qrcode")} />
          <p>请长按上方二维码，{"\r\n"}关注我们的公众号。</p>
        </div>
      </div>
    </>
  );
};

export default Logout;
