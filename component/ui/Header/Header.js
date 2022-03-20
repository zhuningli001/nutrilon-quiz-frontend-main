import classNames from "../../../lib/classNames";
import classes from "./Header.module.scss";

const Header = ({ children, className }) => {
  return (
    <div className={classNames(classes.wrapper, className)}>{children}</div>
  );
};
export default Header;
