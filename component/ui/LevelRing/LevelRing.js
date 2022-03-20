import { motion } from "framer-motion";
import classNames from "../../../lib/classNames";
import { getRandomFloat, getRandomInt } from "../../../lib/getRandomNumber";
import Button from "../Button/Button";
import Img from "../Image/Img";
import classes from "./LevelRing.module.scss";

const LEVELCOVERS = [
  "https://res.cloudinary.com/npc2021/image/upload/v1635339071/level_cover_1_f24804047a.png",
  "https://res.cloudinary.com/npc2021/image/upload/v1632823131/level_cover_2_249f115968.png",
  "https://res.cloudinary.com/npc2021/image/upload/v1632823131/level_cover_3_ff792ef78e.png",
  "https://res.cloudinary.com/npc2021/image/upload/v1632823131/level_cover_4_4d0a70795c.png",
  "https://res.cloudinary.com/npc2021/image/upload/v1644336703/Level_cover_05_2x_lmjbnj-c_scale_w_800_iadd8n.png",
];
const COLORS = {
  active: "blue",
  inactive: "gray",
  passed: "gold",
};

const LevelRing = ({
  src,
  level = 1,
  status = "active",
  custom = {},
  className,
  size,
  text,
  onClick = undefined,
}) => {
  size =
    typeof size === "number"
      ? `${size}px`
      : /\D/.test(size)
      ? size
      : `${size}px`;

  return (
    <motion.div
      className={classNames(classes.wrapper, classes[status], className)}
      initial={{ width: size, height: size, ...custom }}
      onClick={status === "active" && !!onClick ? onClick : undefined}
    >
      <Img
        src={src ? src : LEVELCOVERS[level]}
        className={classes.level}
        layout="fill"
        objectFit="cover"
      />
      {text && (
        <Button
          size="s"
          color={COLORS[status]}
          active={status === "active" ? true : false}
          className={classes.btn}
        >
          {text}
        </Button>
      )}
    </motion.div>
  );
};

export default LevelRing;
