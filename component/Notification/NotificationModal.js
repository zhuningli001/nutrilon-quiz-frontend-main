import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getBrandImage } from "../../lib/brandAssets";
import { gameActions } from "../../store/gameSlice";
import {
  playerActions,
  startANewGame,
  syncPlayerData,
} from "../../store/playerSlice";
import { uiActions } from "../../store/uiSlice";

import Bg from "../ui/Background/Bg";
import Button from "../ui/Button/Button";
import Header from "../ui/Header/Header";
import Img from "../ui/Image/Img";
import Loader from "../ui/Loader/Loader";

import classes from "./NotificationModal.module.scss";

const NotificationModal = () => {
  const ui = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const router = useRouter();
  const containerRef = useRef(null);

  if (!ui.notificationModal && !ui.syncModal) return null;

  if (ui.syncModal) {
    return (
      <div className={classes.backdrop}>
        <Loader />
      </div>
    );
  }

  const hideModalHandler = () => {
    dispatch(uiActions.hideNotification());
  };

  const defaultHandler = () => {
    dispatch(uiActions.hideNotification());
    router.replace("/");
  };
  const handlers = {
    logout() {
      dispatch(playerActions.logout());
      dispatch(uiActions.hideNotification());
      router.replace("/logout");
    },
    close() {
      dispatch(uiActions.hideNotification());
    },
    goBack() {
      dispatch(uiActions.hideNotification());
      router.back();
    },
    goBackFromGame() {
      dispatch(gameActions.resetGame());
      dispatch(uiActions.hideNotification());
      router.back();
    },
    reload() {
      dispatch(uiActions.hideNotification());
      router.reload();
    },
    goHome() {
      dispatch(uiActions.hideNotification());
      router.replace("/");
    },
    goToLevels() {
      dispatch(uiActions.hideNotification());
      router.replace("/levels");
    },
    async goToLandingAsTester() {
      await dispatch(
        syncPlayerData({
          avatar: null,
          shopurl: "",
          score1: 0,
          score2: 0,
          score3: 0,
          score4: 0,
          score5:0,
          scoreTotal: 0,
          currentLevel: 0,
          life: 3,
          lastGameAt: "",
          lastCertificateDate: null,
          certificates: [],
        })
      );
      dispatch(uiActions.hideNotification());
      console.log("redirecting to landing");
      router.replace("/landing");
    },
    async goToGame() {
      await dispatch(startANewGame());
      dispatch(uiActions.hideNotification());
      router.push("/game");
    },
    goToMe() {
      dispatch(uiActions.hideNotification());
      router.replace("/me");
    },
    goToMeFromGame() {
      dispatch(gameActions.resetGame());
      dispatch(uiActions.hideNotification());
      router.replace("/me");
    },
    goToVerify() {
      window.location.assign("https://sourl.cn/CKGPDX");
    },
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: "anticipate" }}
        className={classes.backdrop}
        onClick={hideModalHandler}
      />
      <div className={classes.modal} ref={containerRef}>
        <motion.div
          drag="y"
          dragConstraints={containerRef}
          className={classes.content}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: "anticipate" }}
        >
          <Bg />

          <div className={classes.nav}>
            {ui.notificationBear && (
              <Img {...getBrandImage("bear4")} className={classes.bear} />
            )}
            <Header className={classes.header}>{ui.notificationTitle}</Header>
            <Button
              className={classes.exit}
              type="circle"
              color="blue"
              size="m"
              src="/icons/icon-x.svg"
              onClick={hideModalHandler}
            />
          </div>

          <p className={classes.text}>
            {ui.notificationText ||
              "很抱歉，我们遇到了一些问题，请刷新本页面。"}
          </p>

          <Button
            className={classes.btn}
            onClick={handlers[ui.notificationHandler] || defaultHandler}
          />

          {ui.notificationQRCode && (
            <div className={classes.qrcode}>
              <Img
                {...getBrandImage("qrcode")}
                objectFit="cover"
                layout="fill"
              />
              <p>长按扫描前往微信公众号</p>
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default NotificationModal;
