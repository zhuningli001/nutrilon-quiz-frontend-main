import { useSelector } from "react-redux";
import classes from "./QuestionModalQuestionTimer.module.scss";

const QuestionModalQuestionTimer = () => {
  const { currentQuestionIndex } = useSelector((state) => state.game);
  return (
    <div className={classes.wrapper}>
      <div className={classes.index}>
        <span>第</span>
        <span>{currentQuestionIndex + 1}</span>
        <span>题</span>
      </div>

      <svg
        id="question_timer"
        width="80"
        height="80"
        viewBox="0 0 80 80"
        xmlns="http://www.w3.org/2000/svg"
      >
        <radialGradient
          id="groove_timer"
          gradientUnits="userSpaceOnUse"
          cx="50%"
          cy="50%"
          r="50%"
        >
          <stop stopColor="#fff" offset="0" />
          <stop stopColor="#9e9e9e" offset="1" />
        </radialGradient>
        <linearGradient
          id="inner_circle_timer"
          gradientUnits="userSpaceOnUse"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop stopColor="#e4e4e4" offset="0" />
          <stop stopColor="#cfcfcf" offset="1" />
        </linearGradient>
        <circle cx="50%" cy="50%" r="34" fill="url(#groove_timer)" />
        <circle cx="40" cy="40" r="26" fill="url(#inner_circle_timer)" />
        <circle
          className={classes.timer}
          cx="40"
          cy="40"
          r="30"
          fill="none"
          transform="rotate(-90, 40, 40)"
        />
      </svg>
    </div>
  );
};

export default QuestionModalQuestionTimer;
