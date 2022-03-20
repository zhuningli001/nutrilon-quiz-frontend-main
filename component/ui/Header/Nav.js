import { useRouter } from "next/router";
import Link from "next/link";
import classNames from "../../../lib/classNames";
import Header from "./Header";
import Button from "../Button/Button";
import classes from "./Nav.module.scss";

const Nav = ({
  title,
  containerClassName,
  className,
  leftIcon = "/icons/icon-angle-bracket.svg",
  leftAlt = "icon of going to previous page",
  leftClickHandler,
  rightIcon = "/icons/icon-me.svg",
  rightAlt = "icon of going to me page",
  rightClickHandler,
  sideText,
  sideHref = "/manual",
}) => {
  const router = useRouter();
  if (!leftClickHandler) leftClickHandler = () => router.push("/landing");
  if (!rightClickHandler) rightClickHandler = () => router.push("/me");

  return (
    <div className={classNames(classes.nav, containerClassName)}>
      <section className={classes.header}>
        <Button
          size="m"
          color="blue"
          type="circle"
          src={leftIcon}
          alt={leftAlt}
          onClick={leftClickHandler}
        />

        <Header className={className}>{title}</Header>

        <Button
          size="m"
          color="blue"
          type="circle"
          src={rightIcon}
          alt={rightAlt}
          onClick={rightClickHandler}
        />
      </section>

      {sideText && (
        <section className={classes.side}>
          <Button size="s" color="blue" className={classes.btn}>
            <Link href={sideHref}>{sideText}</Link>
          </Button>
        </section>
      )}
    </div>
  );
};

export default Nav;
