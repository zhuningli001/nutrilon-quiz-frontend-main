import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import useScreenSize from "../../../hooks/useScreenSize";

import Bg from "../../ui/Background/Bg";
import Button from "../../ui/Button/Button";
import Header from "../../ui/Header/Header";

import classes from "./AvatarScreen.module.scss";
import { playerActions, syncPlayerData } from "../../../store/playerSlice";

export const BGS = [
  {
    src: "https://res.cloudinary.com/npc2021/image/upload/v1632321460/bg_mom_2x_65bedb6ae0.png",
    width: 750,
    height: 1624,
    type: "png",
    title: "妈妈",
    //   blurDataURL:
    //     "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAAECAIAAAArjXluAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAJ0lEQVQImQEcAOP/AJmttnaKmADa4+iYq7gA////3tbSABsvNgAHDeb8Dkznr48eAAAAAElFTkSuQmCC",
  },
  {
    src: "https://res.cloudinary.com/npc2021/image/upload/v1632321526/bg_dad_2x_e77a59ee5e.png",
    width: 750,
    height: 1624,
    type: "png",
    title: "爸爸",
    //   blurDataURL:
    //     "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAAECAIAAAArjXluAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAJ0lEQVQImQEcAOP/AM7W3/3//wDDytXW3ugAvcvVx8LHABoyNgAHCxBwD74Te3NvAAAAAElFTkSuQmCC",
  },
  {
    src: "https://res.cloudinary.com/npc2021/image/upload/v1632321500/bg_baby_2x_1232d80d5d.png",
    width: 750,
    height: 1624,
    type: "png",
    title: "宝宝",
    //   blurDataURL:
    //     "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAAECAIAAAArjXluAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAJUlEQVQImWM4e+vFj///Ge68+HTo0kMGs7AcfY9wBl1XXwYufgD3dQ1PrmoKYwAAAABJRU5ErkJggg==",
  },
];

const AVATARS = [
  {
    src: "https://res.cloudinary.com/npc2021/image/upload/v1632301468/avatar_mom_2x_66463e17d7.png",
    className: classes.mom,
    alt: "avatar of mom with the ice bear",
    width: 917,
    height: 1332,
  },
  {
    src: "https://res.cloudinary.com/npc2021/image/upload/v1632301468/avatar_dad_2x_dfbc978cf0.png",
    className: classes.dad,
    alt: "avatar of dad with the ice bear",
    width: 932,
    height: 1405,
  },
  {
    src: "https://res.cloudinary.com/npc2021/image/upload/v1632326278/avatar_baby_2x_10176830e6.png",
    className: classes.baby,
    alt: "avatar of baby with the ice bear",
    width: 728,
    height: 1122,
  },
];

// animation configs for swiping
export const SWIPE_THRESHOLD = 60000;
export const swipePower = (offset, velocity) => Math.abs(offset) * velocity;

const AvatarScreen = (props) => {
  const dispatch = useDispatch();

  //record current page and paginate direction
  const [[page, direction], setPage] = useState([0, 0]);
  const changePage = (newDirection) => {
    setPage(([prevPage, prevDirection]) => [
      prevPage + newDirection,
      newDirection,
    ]);
  };

  // translate the page to avatar index
  const avatarNums = BGS.length;
  const avatarIndex = ((page % avatarNums) + avatarNums) % avatarNums;

  // motion.div variants (depending on the screen width)
  const { width: screenWidth } = useScreenSize();
  const variants = useMemo(
    () => ({
      initial: (direction) => ({
        x: direction > 0 ? screenWidth : -screenWidth,
        scale: 0.4,
        opacity: 0,
      }),
      animate: { zIndex: 1, x: 0, opacity: 1, scale: 1 },
      exit: (direction) => ({
        zIndex: 0,
        x: direction > 0 ? -screenWidth : screenWidth,
        scale: 0.4,
        opacity: 0,
      }),
    }),
    [screenWidth]
  );

  // Selecting avatars
  const selectAvatarHandler = (index) => {
    dispatch(playerActions.replacePlayerInfo({ avatar: index }));
    try {
      (async () => {
        await dispatch(syncPlayerData({ avatar: index }));
      })();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={classes.wrapper}>
      <AnimatePresence initial={false} custom={direction}>
        <motion.section
          className={classes.background}
          key={page}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          custom={direction}
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.3 },
          }}
          drag="x"
          whileDrag={{ scale: 0.8, filter: "blur(6px)" }}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            // console.log(`offset: ${offset.x}`);
            // console.log(`velocity: ${velocity.x}`);
            const swipe = swipePower(offset.x, velocity.x);
            if (swipe > SWIPE_THRESHOLD) {
              changePage(-1);
            } else if (swipe < -SWIPE_THRESHOLD) {
              changePage(1);
            }
          }}
        >
          <Bg bgProps={BGS[avatarIndex]} />
          <img
            src={AVATARS[avatarIndex].src}
            alt={AVATARS[avatarIndex].alt}
            className={AVATARS[avatarIndex].className}
            // width={AVATARS[avatarIndex].width}
            // height={AVATARS[avatarIndex].height}
          />
        </motion.section>
      </AnimatePresence>

      <section className={classes.console}>
        <div className={classes.title}>
          <Header>玩家形象选择</Header>
          <div className={classes.paginate}>
            <Button
              size="m"
              color="blue"
              type="circle"
              src="/icons/icon-angle-bracket.svg"
              alt="icon of previous"
              onClick={() => changePage(-1)}
            />
            <span>{BGS[avatarIndex].title}</span>
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

        <Button
          className={classes.confirm}
          onClick={selectAvatarHandler.bind(null, avatarIndex)}
        />
      </section>
    </div>
  );
};

export default AvatarScreen;
