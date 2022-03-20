import classNames from "../../../lib/classNames";
import classes from "./Button.module.scss";

const Button = (props) => {
  const {
    onClick = null,
    children,
    color = "gold",
    size = "l",
    type = "rect",
    className = "",
    active = true,
    float = false,
    ring = true,
    src,
    alt,
  } = props;

  return (
    <button
      className={classNames(
        classes[type] || classes.rect,
        classes[color] || classes.gold,
        classes[size] || classes.l,
        active ? classes.convex : classes.concave,
        float && classes.float,
        ring && classes.ring,
        className
      )}
      onClick={onClick}
    >
      {src ? <img src={src} alt={alt} /> : children ?? "确认"}
    </button>
  );
};

export default Button;
