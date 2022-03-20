import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import { playerActions } from "../store/playerSlice";

import logError from "../lib/logError";
import Bg from "../component/ui/Background/Bg";
import LoaderDrop from "../component/ui/Loader/LoaderDrop";
import AvatarScreen from "../component/Screens/Avatar/AvatarScreen";
import LandingScreen from "../component/Screens/Landing/LandingScreen";
import { uiActions } from "../store/uiSlice";

const Landing = () => {
  const [loaded, setLoaded] = useState(false);
  const [synced, setSynced] = useState(false);
  const [isFirst, setIsFirst] = useState(false);
  const router = useRouter();
  const player = useSelector((state) => state.player);
  const dispatch = useDispatch();

  useEffect(() => {
    // If player info is present, just continue
    if (player.openid && localStorage.getItem("NUTRILON_PLAYER")) {
      setSynced(true);
      setLoaded(true);
      return;
    }

    // Otherwise, query player info
    const queryString = window.location.search;
    const queryObject = new URLSearchParams(queryString);
    const code = queryObject.get("code");

    if (!code) {
      router.push("/");
      return;
    }

    axios
      .post("/api/getPlayer", { code })
      // Store player data in Redux
      .then((res) => {
        console.log("response status 200");
        dispatch(playerActions.replacePlayerInfo(res.data));
        dispatch(playerActions.login(res.data.hashid));
        setSynced(true);
        console.log("player data synced");
      })
      .catch((error) => {
        console.log(error);
        dispatch(
          uiActions.showNotification({
            text: "服务器开小差了，请再次尝试。",
            qrcode: true,
            handler: "goHome",
          })
        );
        logError({ error, message: "Cannot get userinfo from WeChat" });
        localStorage.removeItem("NUTRILON_PLAYER");
        setTimeout(() => router.push("/"), 5000);
      })
      .finally(() => {
        setLoaded(true);
      });
  }, []);

  useEffect(() => {
    // Check validity of the player avatar
    if (
      typeof player.avatar === "number" &&
      ![0, 1, 2].includes(player.avatar)
    ) {
      dispatch(playerActions.replacePlayerInfo({ avatar: null }));
    }

    // Pop-up for first time player
    if (player.avatar === null) {
      setIsFirst(true);
      dispatch(
        uiActions.showNotification({
          text: "快来和小北极熊一起踏上荷兰之旅。 小北极熊会带你前往 Nutrilon 的重要景点，在那里您可以探索发现想要了解的关于Nutrilon品牌和产品的一切信息！ 你可以在旅途中集齐拼图的所有部分，来解锁独家宣传资料库，并成为官方认证的品牌大使。 对成功通过全部等级的人，官方证书正等着你！\r\n\r\n下面请你选择你的游戏形象，并仔细阅读游戏说明后再开始游戏。",
          handler: "close",
          bear: true,
          title: "欢迎启程",
        })
      );
    } else {
      setIsFirst(false);
    }
  }, [player.avatar]);

  return (
    <>
      {!loaded && <LoaderDrop />}

      {loaded && !synced && (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <p style={{ width: "80%", textAlign: "center" }}>player not found</p>
        </div>
      )}

      {loaded && synced && isFirst && <AvatarScreen />}

      {loaded && synced && !isFirst && <LandingScreen />}

      <Bg />
    </>
  );
};

export default Landing;
