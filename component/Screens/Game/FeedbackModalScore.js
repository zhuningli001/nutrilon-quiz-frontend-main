import classNames from "../../../lib/classNames";

import classes from "./FeedbackModalScore.module.scss";

const FeedbackModalScore = ({ result, score, sign = true, className }) => {
  const digits = score.toString().split("");
  if (digits.length === 1) digits.unshift(0);
  const scoreEls = digits.map((digit, index) => (
    <span key={`feedback-score-${index}`}>{digit}</span>
  ));

  return (
    <div
      className={classNames(
        classes.wrapper,
        !result && classes.negative,
        className
      )}
    >
      {sign && <div className={classes.sign}>+</div>}
      <div className={classes.digits}>{scoreEls}</div>
    </div>
  );
};

export default FeedbackModalScore;
