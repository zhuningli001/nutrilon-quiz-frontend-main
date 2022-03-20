import { getBrandImage } from "../../../lib/brandAssets";
import classNames from "../../../lib/classNames";
import Img from "../Image/Img";
import classes from "./Bg.module.scss";

const Bg = ({
  bgProps = getBrandImage("default"),
  stretch = true,
  className,
  ...rest
}) => {
  if (stretch) {
    bgProps.width = null;
    bgProps.height = null;
    bgProps.layout = "fill";
    bgProps.objectFit = "fill";
  } else {
    bgProps.layout = null;
    bgProps.objectPosition = "top";
  }

  return (
    <Img
      {...bgProps}
      className={classNames(classes.bg, className)}
      data-background-image
      {...rest}
    />
  );
};

export default Bg;
