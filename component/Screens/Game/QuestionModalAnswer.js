import { useState } from "react";
import { useDispatch } from "react-redux";
import classes from "./QuestionModalAnswer.module.scss";
import Button from "../../ui/Button/Button";
import { gameActions } from "../../../store/gameSlice";
import classNames from "../../../lib/classNames";
import { uiActions } from "../../../store/uiSlice";

const QuestionModalAnswer = ({
  answer,
  answerKey,
  chooseAnAnswerHandler,
  selected,
}) => {
  const dispatch = useDispatch();

  const clickHandler = () => {
    chooseAnAnswerHandler(answerKey);
  };
  const confirmHandler = () => {
    dispatch(
      gameActions.scorecurrentQuestionIndex({ answer, endTime: Date.now() })
    );
    dispatch(uiActions.showFeedback());
  };

  return (
    <li className={classes.wrapper} onClick={clickHandler}>
      <span className={classNames(selected && classes.active)}>
        {answerKey}
      </span>
      <span>{answer}</span>
      {selected && (
        <Button size="s" className={classes.btn} onClick={confirmHandler} />
      )}
    </li>
  );
};

export default QuestionModalAnswer;
