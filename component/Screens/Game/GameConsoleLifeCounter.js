import { useSelector } from "react-redux";
import classNames from "../../../lib/classNames";

import classes from "./GameConsoleLifeCounter.module.scss";

const GameConsoleLifeCounter = () => {
  const { life } = useSelector((state) => state.player);

  return (
    <div className={classes.wrapper}>
      <span className={classNames(life < 1 && classes.inactive)} />
      <span className={classNames(life < 2 && classes.inactive)} />
      <span className={classNames(life < 3 && classes.inactive)} />
    </div>
  );
};

export default GameConsoleLifeCounter;
