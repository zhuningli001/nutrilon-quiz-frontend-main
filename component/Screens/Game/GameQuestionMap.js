import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../../store/uiSlice";

import Button from "../../ui/Button/Button";
import classes from "./GameQuestionMap.module.scss";

const GameQuestionMap = () => {
  const game = useSelector((state) => state.game);
  const dispatch = useDispatch();
  const { answerList, currentQuestionIndex } = game;
  const { isCorrect } = answerList;

  const questionBtns = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].reverse().map((e) => {
    const index = e - 1;
    let color = "gray",
      active = true,
      clickHandler = null;
    if (index === currentQuestionIndex) {
      color = "gold";
      clickHandler = () => {
        dispatch(uiActions.showQuestion());
      };
    } else if (index < currentQuestionIndex) {
      active = false;
      color = isCorrect[index]
        ? "blue"
        : isCorrect[index] === false
        ? "red"
        : "gray";
    }

    return (
      <Button
        key={e}
        className={classes[`btn-${e}`]}
        float
        type="circle"
        color={color}
        active={active}
        onClick={clickHandler}
      >
        {e}
      </Button>
    );
  });
  return <div className={classes.btns}>{questionBtns}</div>;
};

export default GameQuestionMap;
