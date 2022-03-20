import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useMemo, useState } from "react";
import Bg from "../component/ui/Background/Bg";
import Button from "../component/ui/Button/Button";
import Header from "../component/ui/Header/Header";
import classes from "../styles/Manual.module.scss";
import {
  SWIPE_THRESHOLD,
  swipePower,
} from "../component/Screens/Avatar/AvatarScreen";
import useScreenSize from "../hooks/useScreenSize";
import { getManual } from "../lib/brandAssets";
import Img from "../component/ui/Image/Img";
import ClientOnlyPortal from "../component/ui/ClientOnlyPortal/ClientOnlyPortal";
import { useRouter } from "next/router";

const Manual = () => {
  const router = useRouter();
  const [[page, direction], setPage] = useState([0, 0]);
  const changePage = (direction) => {
    setPage(([prevPage, _]) => [prevPage + direction, direction]);
  };

  const manualContent = getManual(page);

  // motion.div variants (depending on the screen width)
  const { width: screenWidth } = useScreenSize();
  const variants = useMemo(
    () => ({
      initial: (direction) => ({
        x: direction > 0 ? screenWidth / 2 : -screenWidth / 2,
        opacity: 0,
      }),
      animate: { zIndex: 1, x: 0, opacity: 1, scale: 1 },
      exit: (direction) => ({
        zIndex: 0,
        x: direction > 0 ? -screenWidth : screenWidth,
        opacity: 0,
      }),
    }),
    [screenWidth]
  );

  // handlers for the main botton
  const nextPage = useCallback(() => {
    setPage(([prevPage, _]) => [prevPage + 1, 1]);
  }, []);

  const goBackHome = useCallback(() => {
    router.back();
  }, []);

  return (
    <>
      <ClientOnlyPortal selector="[data-fixed]">
        <div className={classes.title}>
          <Header className={classes.header}>
            游戏说明 - {manualContent.index + 1}/11
          </Header>
          <div className={classes.paginate}>
            <Button
              size="m"
              color="blue"
              type="circle"
              src="/icons/icon-angle-bracket.svg"
              alt="icon of previous"
              onClick={() => changePage(-1)}
            />
            <Button
              className={classes.mirror}
              src="/icons/icon-angle-bracket.svg"
              alt="icon of next"
              size="m"
              color="blue"
              type="circle"
              onClick={() => changePage(1)}
            />
          </div>
        </div>
      </ClientOnlyPortal>

      <AnimatePresence initial={false} custom={direction} exitBeforeEnter>
        <motion.section
          className={classes.page}
          key={page}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          custom={direction}
          transition={{
            x: { type: "spring", stiffness: 600, damping: 60, duration: 0.15 },
            opacity: { duration: 0.1 },
          }}
          drag="x"
          whileDrag={{ scale: 0.9 }}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);
            if (swipe > SWIPE_THRESHOLD) {
              changePage(-1);
            } else if (swipe < -SWIPE_THRESHOLD) {
              changePage(1);
            }
          }}
        >
          <p className={classes.text}>{manualContent.content}</p>
          {manualContent.image.src && (
            <Img
              className={classes.image}
              {...manualContent.image}
              layout="fill"
              objectFit="contain"
            />
          )}

          <div className={classes.actions}>
            <Button
              onClick={manualContent.index === 10 ? goBackHome : nextPage}
            >
              {manualContent.index === 10 ? "返回游戏" : "下一页"}
            </Button>
            <a role="button" onClick={goBackHome} className={classes.exit}>
              返回游戏
            </a>
          </div>
        </motion.section>
      </AnimatePresence>

      <Bg />
    </>
  );
};

export default Manual;
