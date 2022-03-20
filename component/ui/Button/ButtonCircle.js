import classNames from "../../../lib/classNames";
import classes from "./ButtonCircle.module.scss";

const ButtonCircle = ({ className, children, onClick = null, src, alt }) => {
  return (
    <button className={classNames(classes.btn, className)} onClick={onClick}>
      {children || <img src={src} alt={alt} />}
    </button>
  );
};

export default ButtonCircle;
