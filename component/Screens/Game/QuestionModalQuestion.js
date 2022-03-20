import classes from "./QuestionModalQuestion.module.scss";
import QuestionModalQuestionTimer from "./QuestionModalQuestionTimer";

const QuestionModalQuestion = ({ question }) => {
  return (
    <div className={classes.wrapper}>
      <QuestionModalQuestionTimer />
      <h2>{question}</h2>
    </div>
  );
};

export default QuestionModalQuestion;
