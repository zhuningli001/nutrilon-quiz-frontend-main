import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";

import Button from "../../ui/Button/Button";
import Img from "../../ui/Image/Img";
import QuestionModalAnswer from "./QuestionModalAnswer";
import QuestionModalQuestion from "./QuestionModalQuestion";
import { uiActions } from "../../../store/uiSlice";

import classes from "./QuestionModal.module.scss";
import { useState } from "react";

const temp =
  "https://res.cloudinary.com/npc2021/image/upload/v1633447448/nutricia_research_center_building_f753839aae.jpg";

const QuestionModal = () => {
  const game = useSelector((state) => state.game);
  const dispatch = useDispatch();
  const { questionList, currentQuestionIndex } = game;
  const question = questionList.questions[currentQuestionIndex];
  const imageSrc = question.media?.url;

  const hideQuestionModalHandler = () => {
    dispatch(uiActions.hideQuestion());
  };

  const [chosenAnswer, setChosenAnswer] = useState("");
  const chooseAnAnswerHandler = (answerKey) => {
    setChosenAnswer(answerKey);
  };

  const optionEls = Object.entries(question.answers)
    .filter(([key, _]) => key !== "id")
    .map(([key, value]) => (
      <QuestionModalAnswer
        answer={value}
        answerKey={key}
        key={key + value}
        selected={chosenAnswer === key}
        chooseAnAnswerHandler={chooseAnAnswerHandler}
      />
    ));

  return (
    <motion.div
      className={classes.screen}
      initial={{ y: "100vh" }}
      animate={{ y: "0" }}
      exit={{ y: "100vh" }}
      transition={{ duration: 1, type: "tween", ease: "anticipate" }}
    >
      <Img
        src={imageSrc || temp}
        className={classes.image}
        layout="fill"
        objectFit="cover"
        objectPosition="center"
      />

      <Button
        className={classes.backbtn}
        type="circle"
        size="m"
        color="blue"
        src="/icons/icon-angle-bracket.svg"
        ring
        onClick={hideQuestionModalHandler}
      />

      <div className={classes.console}>
        <QuestionModalQuestion question={question.question} />
        <ul className={classes.answers}>{optionEls}</ul>
      </div>
    </motion.div>
  );
};

export default QuestionModal;
