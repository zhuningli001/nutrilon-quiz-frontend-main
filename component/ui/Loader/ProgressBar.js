import classes from "./ProgressBar.module.scss";

const ProgressBar = (props) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.progress}></div>
    </div>
  );
};

export default ProgressBar;
