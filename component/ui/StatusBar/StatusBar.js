import classes from "./StatusBar.module.scss";

const StatusBar = ({ title, status, onClick }) => {
  return (
    <div className={classes.wrapper} onClick={onClick}>
      <span>{title}</span>
      <span>{status}</span>
    </div>
  );
};

export default StatusBar;
