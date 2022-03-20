import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { playerActions } from "../store/playerSlice";
import { useEffect } from "react";
import { getPlaiceholder } from "plaiceholder";
import Bg from "../component/ui/Background/Bg";
import Button from "../component/ui/Button/Button";
import LoaderDrop from "../component/ui/Loader/LoaderDrop";
import { uiActions } from "../store/uiSlice";

const Test = () => {
  const dispatch = useDispatch();
  const player = useSelector((state) => state.player);

  useEffect(() => {
    if (localStorage.getItem("NUTRILON_PLAYER"))
      localStorage.removeItem("NUTRILON_PLAYER");

    localStorage.setItem("NUTRILON_PLAYER", "12345-1814718944");
    // init tester
    dispatch(playerActions.setTester({}));

    axios
      .get("./api/getPlayer", {
        params: {
          hashid: localStorage.getItem("NUTRILON_PLAYER"),
        },
      })
      .then((res) => {
        // received tester's image data etc
        dispatch(playerActions.setTester(res.data));
        dispatch(
          uiActions.showNotification({
            text: "Welcome to test the game. By clicking the button below you may continue with the game. But to obtain a certificate, you first have to logout as a test player manually on your profile page.",
            qrcode: false,
            handler: "goToLandingAsTester",
          })
        );
      })
      .catch((error) => {
        dispatch(
          uiActions.showNotification({
            text: "Error accessing the test account, click the button below to try again.",
            qrcode: true,
            handler: "reload",
          })
        );
      });
  }, []);

  const clickHandler = () => {
    console.log(player.openid);
    dispatch(
      uiActions.showNotification({
        text: "Welcome to test the game. By clicking the button below you may continue with the game. But to obtain a certificate, you first have to logout as a test player manually on your profile page.",
        qrcode: false,
        handler: "goToLandingAsTester",
      })
    );
  };

  return (
    <>
      <LoaderDrop />
      <Bg />

      <div className="btn--test">
        <Button onClick={clickHandler}>Start Testing</Button>
      </div>
    </>
  );
};

export default Test;

export const getStaticProps = async () => {
  const imagePaths = {
    droplet:
      "https://res.cloudinary.com/npc2021/image/upload/v1631799581/asset_droplet_97fae8690e.png",
    bgLanding:
      "https://res.cloudinary.com/npc2021/image/upload/v1631793369/bg_landing_90a0720ec7.png",
    bgMom:
      "https://res.cloudinary.com/npc2021/image/upload/v1632321460/bg_mom_2x_65bedb6ae0.png",
    bgDad:
      "https://res.cloudinary.com/npc2021/image/upload/v1632321526/bg_dad_2x_e77a59ee5e.png",
    bgbaby:
      "https://res.cloudinary.com/npc2021/image/upload/v1632321500/bg_baby_2x_1232d80d5d.png",
  };

  const images = await Promise.all(
    Object.entries(imagePaths).map(async ([title, src]) => {
      const { base64, img } = await getPlaiceholder(src);
      return {
        ...img,
        title,
        blurDataURL: base64,
      };
    })
  ).then((values) => values);

  return {
    props: {
      images,
    },
  };
};
